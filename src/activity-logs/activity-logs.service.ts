import {Injectable} from '@nestjs/common';
import {DetailI, MessageI, StructuredDataI} from './activity-logs.interface';
import {FACILITY_MAP, SEVERITY_MAP} from "./activity-logs.constansts";

@Injectable()
export class ActivityLogsService {
  private FACILITY = FACILITY_MAP.get("user-level messages");
  private VERSION = "1";
  private MSGID = 'USER_ACTIVITY';

  public info(data: StructuredDataI, msg: MessageI): string {
    const severity = SEVERITY_MAP.get("informational");
    const prival = `<${this.FACILITY * 8 + severity}>${this.VERSION}`;
    const log = this.create(data, msg, prival);
    console.info(log);
    return log;
  }

  public warn(data: StructuredDataI, msg: MessageI): string {
    const severity = SEVERITY_MAP.get("warning");
    const prival = `<${this.FACILITY * 8 + severity}>${this.VERSION}`;
    const log = this.create(data, msg, prival);
    console.warn(log);
    return log;
  }

  private create(data: StructuredDataI, msg: MessageI, prival: string): string {
    const structuredData = Object
      .entries(data)
      .map((item) => {
        const type = item[0];
        let values: string;
        if(type === "details") {
          values = item[1].map((d: DetailI, i: number) => `content${i + 1}="${d.detail_type}: ${d.detail_content}"`).join(" ")
        } else {
          values = Object.entries(item[1]).map((v: [string, string]) => `${v[0]}="${v[1]}"`).join(" ");
        }
        return `[${type} ${values}]`;
      })
      .join("");

    const map = new Map([
      ['PRIVAL', prival],
      ['TIMESTAMP', new Date().toISOString()],
      ['HOSTNAME', process.env.HOST_NAME],
      ['APPNAME', process.env.APP_NAME],
      ['PROCID', String(process.pid)],
      ['MSGID', this.MSGID],
      ['STRUCTURED DATA', structuredData],
      ['MSG', `${data.user.user_name} ${msg.action} ${msg.action_subject_type} ${msg.action_subject}`]
    ]);

    return [...map.values()].join(" ");
  }
}
