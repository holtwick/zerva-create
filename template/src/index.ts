// Simple demo for node and CommonJS loading

import {
  Logger,
  LoggerNodeHandler,
  LoggerFileHandler,
  LogLevel,
  valueToInteger,
} from "zeed"

Logger.setHandlers([
  LoggerFileHandler("zerva.log", {
    level: LogLevel.debug,
  }),
  LoggerNodeHandler({
    level: LogLevel.info,
    filter: "*",
    colors: true,
    padding: 16,
    nameBrackets: false,
    levelHelper: false,
  }),
])

import { serve, useHttp, register, on } from "zerva"

function useCounter() {
  register("counter", ["http"])
  let counter = 1
  on("httpInit", ({ get }) => {
    get(
      "/",
      () => `Counter ${counter++}.<br><br>Reload page to increase counter.`
    )
  })
  return {
    getCounter: () => counter,
  }
}

useHttp({
  port:  valueToInteger(process.env.PORT, 8080),
})

useCounter()

serve()
