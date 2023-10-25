import * as opentelemetry from "@opentelemetry/sdk-node";
import type { Attributes } from "@opentelemetry/api";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-proto";
import { Resource } from "@opentelemetry/resources";
import { getNodeAutoInstrumentations } from "@opentelemetry/auto-instrumentations-node";
import { getRandomValues } from "crypto";

const setup = () => {
  const attributes: Attributes = {};
  attributes["highlight.project_id"] = "4d7k1xeo";
  attributes["highlight.service_name"] = "bundlers";

  const sdk = new opentelemetry.NodeSDK({
    instrumentations: [getNodeAutoInstrumentations()],
    resource: {
      attributes,
      merge: (resource) =>
        new Resource({
          ...(resource?.attributes ?? {}),
          ...attributes,
        }),
    },
    traceExporter: new OTLPTraceExporter({
      url: "https://otel.highlight.io:4318/v1/traces",
    }),
  });
  sdk.start();
  return sdk;
};

const work = async () => {
  const r = await fetch("https://pri.highlight.io");
  const json = await r.json();
  console.log("request", { json });
  let result = 0;
  for (const i of Array(1_000_000).fill(0)) {
    const array = new Uint32Array(1_000);
    getRandomValues(array);
    for (const num of array) {
      result += num;
    }
  }
  console.log("hello, world!", { result });
};

const main = async () => {
  const sdk = setup();
  await work();
  await sdk.shutdown();
};

main();
