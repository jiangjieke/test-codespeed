import codspeedPlugin from "@codspeed/vitest-plugin";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [codspeedPlugin()],
  test: {
    // 基准测试配置
    benchmark: {
      include: ['**/*.bench.{js,ts}'],
      exclude: ['node_modules/**/*'],
    }
  }
});
