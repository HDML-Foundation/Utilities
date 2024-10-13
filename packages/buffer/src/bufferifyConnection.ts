/**
 * @author Artem Lytvynov
 * @copyright Artem Lytvynov
 * @license Apache-2.0
 */

import { Builder } from "flatbuffers";
import {
  ConnectorTypesEnum,
  ConnectionStruct,
  JDBCParametersStruct,
  BigQueryParametersStruct,
  GoogleSheetsParametersStruct,
  ElasticsearchParametersStruct,
  MongoDBParametersStruct,
  SnowflakeParametersStruct,
} from "@hdml/schemas";
import {
  Connection,
  ConnectionOptions,
  JDBCParameters,
  BigQueryParameters,
  GoogleSheetsParameters,
  ElasticsearchParameters,
  MongoDBParameters,
  SnowflakeParameters,
} from "@hdml/types";

/**
 * Serializes a TypeScript `Connection` object into its FlatBuffers
 * representation.
 *
 * This function converts a TypeScript `Connection` object, which
 * defines database or data-source connection parameters, into its
 * FlatBuffers counterpart. The `Connection` object can represent
 * a variety of connection types including JDBC, BigQuery,
 * GoogleSheets, Elasticsearch, MongoDB, and Snowflake.
 *
 * ## Example:
 *
 * ```typescript
 * const builder = new Builder(1024);
 * const connection: ConnectionStruct = {
 *   name: "MyConnection",
 *   meta: "Metadata for connection",
 *   options: {
 *     connector: ConnectorTypesEnum.MongoDB,
 *     parameters: {
 *       host: "localhost",
 *       port: 27017,
 *       user: "admin",
 *       password: "password",
 *       schema: "my_schema",
 *       ssl: false,
 *     },
 *   },
 * };
 * const bufferOffset = bufferifyConnection(builder, connection);
 * ```
 *
 * @param builder The FlatBuffers `Builder` instance used to
 * serialize data.
 *
 * @param connection The TypeScript `ConnectionStruct` object
 * representing the connection configuration.
 *
 * @returns The offset of the serialized `ConnectionStruct` structure
 * in the FlatBuffers builder.
 */
export function bufferifyConnection(
  builder: Builder,
  connection: Connection,
): number {
  const nameOffset = builder.createString(connection.name);
  const descriptionOffset = builder.createString(
    connection.description,
  );
  const optionsOffset = bufferifyConnectionOptions(
    builder,
    connection.options,
  );

  ConnectionStruct.startConnectionStruct(builder);
  ConnectionStruct.addName(builder, nameOffset);
  ConnectionStruct.addDescription(builder, descriptionOffset);
  ConnectionStruct.addOptions(builder, optionsOffset);
  return ConnectionStruct.endConnectionStruct(builder);
}

/**
 * Serializes `ConnectionOptions` into FlatBuffers based on the
 * connector type.
 *
 * @param builder The FlatBuffers `Builder` instance.
 *
 * @param options The `ConnectionOptions` object.
 *
 * @returns The offset of the serialized `ConnectionOptions`.
 */
function bufferifyConnectionOptions(
  builder: Builder,
  options: ConnectionOptions,
): number {
  switch (options.connector) {
    case ConnectorTypesEnum.Postgres:
    case ConnectorTypesEnum.MySQL:
    case ConnectorTypesEnum.MsSQL:
    case ConnectorTypesEnum.Oracle:
    case ConnectorTypesEnum.Clickhouse:
    case ConnectorTypesEnum.Druid:
    case ConnectorTypesEnum.Ignite:
    case ConnectorTypesEnum.Redshift:
    case ConnectorTypesEnum.MariaDB:
      return bufferifyJDBCParameters(builder, options.parameters);
    case ConnectorTypesEnum.BigQuery:
      return bufferifyBigQueryParameters(builder, options.parameters);
    case ConnectorTypesEnum.GoogleSheets:
      return bufferifyGoogleSheetsParameters(
        builder,
        options.parameters,
      );
    case ConnectorTypesEnum.ElasticSearch:
      return bufferifyElasticsearchParameters(
        builder,
        options.parameters,
      );
    case ConnectorTypesEnum.MongoDB:
      return bufferifyMongoDBParameters(builder, options.parameters);
    case ConnectorTypesEnum.Snowflake:
      return bufferifySnowflakeParameters(
        builder,
        options.parameters,
      );
  }
}

function bufferifyJDBCParameters(
  builder: Builder,
  params: JDBCParameters,
): number {
  const hostOffset = builder.createString(params.host);
  const userOffset = builder.createString(params.user);
  const passwordOffset = builder.createString(params.password);

  return JDBCParametersStruct.createJDBCParametersStruct(
    builder,
    hostOffset,
    userOffset,
    passwordOffset,
    params.ssl,
  );
}

function bufferifyBigQueryParameters(
  builder: Builder,
  params: BigQueryParameters,
): number {
  const projectIdOffset = builder.createString(params.project_id);
  const credentialsKeyOffset = builder.createString(
    params.credentials_key,
  );

  return BigQueryParametersStruct.createBigQueryParametersStruct(
    builder,
    projectIdOffset,
    credentialsKeyOffset,
  );
}

function bufferifyGoogleSheetsParameters(
  builder: Builder,
  params: GoogleSheetsParameters,
): number {
  const sheetIdOffset = builder.createString(params.sheet_id);
  const credentialsKeyOffset = builder.createString(
    params.credentials_key,
  );

  const s =
    GoogleSheetsParametersStruct.createGoogleSheetsParametersStruct(
      builder,
      sheetIdOffset,
      credentialsKeyOffset,
    );
  return s;
}

function bufferifyElasticsearchParameters(
  builder: Builder,
  params: ElasticsearchParameters,
): number {
  const hostOffset = builder.createString(params.host);
  const userOffset = builder.createString(params.user);
  const passwordOffset = builder.createString(params.password);
  const regionOffset = builder.createString(params.region);
  const accessKeyOffset = builder.createString(params.access_key);
  const secretKeyOffset = builder.createString(params.secret_key);

  const s =
    ElasticsearchParametersStruct.createElasticsearchParametersStruct(
      builder,
      hostOffset,
      params.port,
      userOffset,
      passwordOffset,
      params.ssl,
      regionOffset,
      accessKeyOffset,
      secretKeyOffset,
    );
  return s;
}

function bufferifyMongoDBParameters(
  builder: Builder,
  params: MongoDBParameters,
): number {
  const hostOffset = builder.createString(params.host);
  const userOffset = builder.createString(params.user);
  const passwordOffset = builder.createString(params.password);
  const schemaOffset = builder.createString(params.schema);

  return MongoDBParametersStruct.createMongoDBParametersStruct(
    builder,
    hostOffset,
    params.port,
    userOffset,
    passwordOffset,
    schemaOffset,
    params.ssl,
  );
}

function bufferifySnowflakeParameters(
  builder: Builder,
  params: SnowflakeParameters,
): number {
  const accountOffset = builder.createString(params.account);
  const userOffset = builder.createString(params.user);
  const passwordOffset = builder.createString(params.password);
  const databaseOffset = builder.createString(params.database);
  const roleOffset = builder.createString(params.role);
  const warehouseOffset = builder.createString(params.warehouse);

  return SnowflakeParametersStruct.createSnowflakeParametersStruct(
    builder,
    accountOffset,
    userOffset,
    passwordOffset,
    databaseOffset,
    roleOffset,
    warehouseOffset,
  );
}