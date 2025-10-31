import { NodeSDK } from '@opentelemetry/sdk-node';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-grpc';
import { BatchSpanProcessor } from '@opentelemetry/sdk-trace-node';

// Perbaikan: Gunakan format URL yang benar untuk gRPC (tanpa http://)
const traceExporter = new OTLPTraceExporter({
  url: 'grpc://otel-collector:4317'
});

const sdk = new NodeSDK({
  // Perbaikan: Gunakan exporter yang sudah didefinisikan
  spanProcessor: new BatchSpanProcessor(traceExporter),
  serviceName: 'product-service',
  instrumentations: [
    getNodeAutoInstrumentations({
      '@opentelemetry/instrumentation-mongodb': {
        enhancedDatabaseReporting: true,
      },
      '@opentelemetry/instrumentation-mongoose': { enabled: true },
    }),
  ],
});

sdk.start();
console.log('✅ Tracing initialized');

process.on('SIGTERM', () => sdk.shutdown());