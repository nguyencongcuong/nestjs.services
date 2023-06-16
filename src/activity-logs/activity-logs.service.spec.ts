import {Test, TestingModule} from "@nestjs/testing";
import {ActivityLogsService} from "./activity-logs.service";
import * as fs from "fs";
import {MessageI, StructuredDataI} from "./activity-logs.interface";

describe("LogsService", () => {
  let service: ActivityLogsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ActivityLogsService],
    }).compile();

    service = module.get<ActivityLogsService>(ActivityLogsService);
  });

  beforeEach(() => {
    process.env.HOST_NAME = "sq-pls-uat-internal-api-app";
    process.env.APP_NAME = "internal-api";
  })

  afterEach(() => {
    process.env.HOST_NAME = undefined;
    process.env.APP_NAME = undefined;
  })

  it("should log some examples:", () => {
    // Arrange
    const payloads: { data: StructuredDataI, msg: MessageI }[] = [
      {
        data: {
          origin: {
            origin_ip: "192.168.1.1",
            origin_platform: "Merchant Portal"
          },
          user: {
            user_id: "c2a6af6c-1af0-4ab8-bb3d-3e7f74e3a45d",
            user_name: "Nguyen Cong Cuong",
            user_email: "CuongNC27@fpt.com",
            user_role: "Administrator"
          },
          category: {
            name: "Configurations > Finance > Invoicing"
          },
          details: [
            {
              detail_type: "Payload",
              detail_content: JSON.stringify({ year: "2023", month: "08", type: "parcelDelivery" })
            }
          ]
        },
        msg: {
          action: "added",
          action_subject: "PDHK20230808.zip",
          action_subject_type: "PD invoice"
        }
      },
      {
        data: {
          origin: {
            origin_ip: "192.168.2.2",
            origin_platform: "Admin Portal"
          },
          user: {
            user_id: "11bceac6-78bd-40d7-a6a7-d19a150777c5",
            user_name: "Nguyen Cong Cuong",
            user_email: "CuongNC27@fpt.com",
            user_role: "Operation User"
          },
          category: {
            name: "Configurations > Finance > Invoicing"
          },
          details: [
            {
              detail_type: "Keywords",
              detail_content: "Detail Content as a string"
            }
          ]
        },
        msg: {
          action: "added",
          action_subject: "PDHK20230808.zip",
          action_subject_type: "PD invoice"
        }
      }
    ]

    const logs = [];

    // Act
    for (const payload of payloads) {
      const message = service.info(payload.data, payload.msg);
      logs.push(message);
    }

    fs.writeFileSync(__dirname + "/activity-logs.txt", logs.join("\n"));

    // Assert
    expect(service).toBeDefined();
  });
});
