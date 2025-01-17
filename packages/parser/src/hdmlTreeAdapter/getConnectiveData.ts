/**
 * @author Artem Lytvynov
 * @copyright Artem Lytvynov
 * @license Apache-2.0
 */

import { FilterOperatorEnum } from "@hdml/schemas";
import {
  FilterClause,
  CONNECTIVE_ATTRS_LIST,
  CONNECTIVE_OP_VALUES,
} from "@hdml/types";
import { Token } from "parse5";

export function getConnectiveData(
  attrs: Token.Attribute[],
): FilterClause {
  const data: FilterClause = {
    type: FilterOperatorEnum.None,
    filters: [],
    children: [],
  };
  attrs.forEach((attr) => {
    switch (attr.name as CONNECTIVE_ATTRS_LIST) {
      case CONNECTIVE_ATTRS_LIST.OPERATOR:
        switch (attr.value as CONNECTIVE_OP_VALUES) {
          case CONNECTIVE_OP_VALUES.NONE:
            data.type = FilterOperatorEnum.None;
            break;
          case CONNECTIVE_OP_VALUES.OR:
            data.type = FilterOperatorEnum.Or;
            break;
          case CONNECTIVE_OP_VALUES.AND:
            data.type = FilterOperatorEnum.And;
            break;
        }
        break;
    }
  });
  return data;
}
