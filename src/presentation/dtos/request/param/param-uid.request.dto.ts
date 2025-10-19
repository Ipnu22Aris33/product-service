import { IsNotEmpty, IsUUID } from 'class-validator';

export class ParamUidRequestDTO {
  @IsUUID()
  @IsNotEmpty()
  uid: string;
}
