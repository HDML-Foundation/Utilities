// automatically generated by the FlatBuffers compiler, do not modify

/* eslint-disable @typescript-eslint/no-unused-vars, @typescript-eslint/no-explicit-any, @typescript-eslint/no-non-null-assertion */

import * as flatbuffers from "flatbuffers";

import { DateUnitEnum } from "../enum/date-unit-enum.js";

/**
 * Date data type parameters structure.
 */
export class DateParametersStruct {
  bb: flatbuffers.ByteBuffer | null = null;
  bb_pos = 0;
  __init(
    i: number,
    bb: flatbuffers.ByteBuffer,
  ): DateParametersStruct {
    this.bb_pos = i;
    this.bb = bb;
    return this;
  }

  static getRootAsDateParametersStruct(
    bb: flatbuffers.ByteBuffer,
    obj?: DateParametersStruct,
  ): DateParametersStruct {
    return (obj || new DateParametersStruct()).__init(
      bb.readInt32(bb.position()) + bb.position(),
      bb,
    );
  }

  static getSizePrefixedRootAsDateParametersStruct(
    bb: flatbuffers.ByteBuffer,
    obj?: DateParametersStruct,
  ): DateParametersStruct {
    bb.setPosition(bb.position() + flatbuffers.SIZE_PREFIX_LENGTH);
    return (obj || new DateParametersStruct()).__init(
      bb.readInt32(bb.position()) + bb.position(),
      bb,
    );
  }

  nullable(): boolean {
    const offset = this.bb!.__offset(this.bb_pos, 4);
    return offset ? !!this.bb!.readInt8(this.bb_pos + offset) : false;
  }

  unit(): DateUnitEnum {
    const offset = this.bb!.__offset(this.bb_pos, 6);
    return offset
      ? this.bb!.readInt8(this.bb_pos + offset)
      : DateUnitEnum.Second;
  }

  static startDateParametersStruct(builder: flatbuffers.Builder) {
    builder.startObject(2);
  }

  static addNullable(
    builder: flatbuffers.Builder,
    nullable: boolean,
  ) {
    builder.addFieldInt8(0, +nullable, +false);
  }

  static addUnit(builder: flatbuffers.Builder, unit: DateUnitEnum) {
    builder.addFieldInt8(1, unit, DateUnitEnum.Second);
  }

  static endDateParametersStruct(
    builder: flatbuffers.Builder,
  ): flatbuffers.Offset {
    const offset = builder.endObject();
    return offset;
  }

  static createDateParametersStruct(
    builder: flatbuffers.Builder,
    nullable: boolean,
    unit: DateUnitEnum,
  ): flatbuffers.Offset {
    DateParametersStruct.startDateParametersStruct(builder);
    DateParametersStruct.addNullable(builder, nullable);
    DateParametersStruct.addUnit(builder, unit);
    return DateParametersStruct.endDateParametersStruct(builder);
  }
}
