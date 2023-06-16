export interface OriginI {
  origin_ip?: string;
  origin_platform: 'Merchant Portal' | 'LSP Portal' | 'Admin Portal' | 'FMD';
}
export interface UserI {
  user_id: string;
  user_name: string;
  user_email: string;
  user_role: string;
}
export interface CategoryI {
  name: 'Bookings'
    | 'Invoices'
    | 'Warehouse > Parcel'
    | 'Warehouse > Container'
    | 'Warehouse > MAWBs'
    | 'Configurations > Distributions > Operation Hubs'
    | 'Configurations > Distributions > Custom Brokers'
    | 'Configurations > Distributions > First Miles'
    | 'Configurations > Distributions > Zones'
    | 'Configurations > Distributions > Countries'
    | 'Configurations > Distributions > Air Freight Rates'
    | 'Configurations > Distributions > Manual DT'
    | 'Configurations > Distributions > Duty & Tax'
    | 'Configurations > Destination Groups'
    | 'Configurations > Rates'
    | 'Configurations > Merchants'
    | 'Configurations > Parcels > Parcel Update'
    | 'Configurations > Parcels > Report Lost/Damage'
    | 'Configurations > Parcels > Force Trigger Status'
    | 'Configurations > Parcels > Cancel Parcel'
    | 'Configurations > Parcels > Pending Tracking IDs'
    | 'Configurations > Parcels > Commercial Invoices'
    | 'Configurations > Surcharge > Fuel'
    | 'Configurations > Surcharge > Report Exception'
    | 'Configurations > Surcharge > History of Exception'
    | 'Configurations > Surcharge > Exception Rates'
    | 'Configurations > Finance > Exchange Rates'
    | 'Configurations > Finance > Tax Rates'
    | 'Configurations > Finance > Invoicing'
    | 'Configurations > Finance > MAWB Amount Upload'
    | 'Configurations > Finance > HS Code'
    | 'Configurations > Finance > Tax Code'
    | 'Configurations > System Configurations'
    | 'User Accounts'
    | 'Logins & Logouts'
    | 'Other Activities > Report'
    | 'Other Activities > Search History'
}
export interface EffectI {
  old: string;
  new: string;
}
export interface DetailI {
  detail_content: string;
  detail_type:
    | 'IP Address'
    | 'Payload'
    | 'Seeker'
    | 'Keywords'
    | 'HTML Content'
}
export type ActionI =
    | 'added'
    | 'approved'
    | 'booked'
    | 'cancelled'
    | 'changed'
    | 'closed'
    | 'created'
    | 'deleted'
    | 'disabled'
    | 'disapproved'
    | 'downloaded'
    | 'edited'
    | 'finished'
    | 'logged in'
    | 'logged out'
    | 'printed'
    | 'removed'
    | 'scanned'
    | 'searched'
    | 'switched'
    | 'updated'
    | 'uploaded'
    | 'viewed'
    | 'withdrew'
export type ActionSubjectI = | 'booking'
| 'shipment'
| 'container'
| 'mawb'
| 'PD invoice'
| 'DT invoice'
| 'commercial invoice'
| 'operation hub'
| 'custom broker'
| 'country'
| 'destination group'
| 'point of discharge'
| 'lmd'
| 'service option'
| 'FMD'
| 'driver'
| 'zone'
| 'kbn'
| 'air freight rates'
| 'duty & tax'
| 'hs code'
| 'hs code tax rate mapping'
| 'derived tax code'
| 'fuel surcharge'
| 'report exception'
| 'surcharge amount'
| 'tax rates'
| 'rate sheet'
| 'mawb amount'
| 'user'
| 'system configuration'
| 'web application'
export interface StructuredDataI {
  origin: OriginI;
  user: UserI;
  category?: CategoryI;
  effect?: EffectI;
  details?: DetailI[]
}
export interface MessageI {
  action: ActionI;
  action_subject_type: ActionSubjectI;
  action_subject: string;
}
