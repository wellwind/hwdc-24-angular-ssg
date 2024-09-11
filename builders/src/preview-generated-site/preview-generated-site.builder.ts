import { BuilderContext, BuilderOutput, createBuilder } from '@angular-devkit/architect';
import { JsonObject } from '@angular-devkit/core';
import * as express from 'express';
import * as path from 'path';

interface Options extends JsonObject {
  source: string;
  port: number;
}

export default createBuilder(previewGeneratedSiteBuilder);

async function previewGeneratedSiteBuilder(
  options: Options,
  context: BuilderContext
): Promise<BuilderOutput> {
  const app = express();

  const staticPath = path.join(context.workspaceRoot, options.source);
  app.use(express.static(staticPath));

  const server = app.listen(options.port, () => {
    context.logger.info(`🌐 Preview server running at http://localhost:${options.port}`);
  });

  // 保持進程運行，並在需要時提供關閉服務器的方法
  return new Promise<BuilderOutput>((resolve) => {
    process.on('SIGINT', () => {
      server.close(() => {
        resolve({ success: true });
      });
    });
  });
}
