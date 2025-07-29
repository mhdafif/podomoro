import { ApiProperty } from '@nestjs/swagger';

export class ResponseDto<T> {
  @ApiProperty()
  message: string;

  @ApiProperty()
  meta?: {
    totalCount?: number;
    totalPages?: number;
    currentPage?: number;
    limit?: number;
    startDate?: Date;
    endDate?: Date;
    [key: string]: any; // For additional metadata if needed
  };

  @ApiProperty()
  data: T;
}
