import NextDocument, {
  DocumentContext,
  DocumentInitialProps,
  Head,
  Html,
  Main,
  NextScript,
} from "next/document";
import { Children } from "react";

export default class Document extends NextDocument {
  static async getInitialProps({
    renderPage,
  }: DocumentContext): Promise<DocumentInitialProps> {
    // AppRegistry.registerComponent("Main", () => Main);
    const page = await renderPage();
    // @ts-ignore
    // const { getStyleElement } = AppRegistry.getApplication("Main");
    const styles = [
      // getStyleElement(),
      // <style
      //   key="tamagui"
      //   dangerouslySetInnerHTML={{
      //     __html: Tamagui.getCSS({
      //       exclude:
      //         process.env.NODE_ENV === "development" ? null : "design-system",
      //     }),
      //   }}
      // />,
    ];
    return { ...page };
  }

  render() {
    return (
      <Html>
        <Head>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Lato:400,500,600,700,800&display=optional"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
