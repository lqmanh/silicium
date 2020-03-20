import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
          <script src="https://unpkg.com/ionicons@5.0.0/dist/ionicons.js"></script>
        </body>
      </Html>
    )
  }
}

export default MyDocument
