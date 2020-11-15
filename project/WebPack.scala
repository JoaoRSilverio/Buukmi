import play.sbt.PlayRunHook
import sbt._

import scala.sys.process._

object WebPack {
  def apply(base: File): PlayRunHook = {

    object WebPackProcess extends PlayRunHook {

      var npxRun: Option[Process] = None

      override def beforeStarted(): Unit = {
        val log = ConsoleLogger()

        if (!(base / "node_modules").exists()) {
          log.info("No node_modules folder. Run 'npm i' from within the ui folder.")
          return
        }

        log.info("Running WebPack in development mode")
        npxRun = Some(npxProcess(base, "webpack").run())
      }
    }

    WebPackProcess
  }

  def npxProcess(base: File, args: String*): ProcessBuilder = {
    val command = "npx"::args.toList
    val os = sys.props("os.name").toLowerCase
    val panderToWindows = os match {
      case x if x contains "indows" => Seq("cmd", "/C") ++ command
      case _ => command
    }
    Process(panderToWindows, base)
  }
}