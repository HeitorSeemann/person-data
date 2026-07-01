import { defineConfig } from "@prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  datasource: {
    // Define a string de conexão em memória do SQLite diretamente por aqui
    url: "file::memory:?cache=shared",
  },
});
