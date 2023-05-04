import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link
            href="https://fonts.googleapis.com/css2?family=Secular+One"
            rel="stylesheet"
          />
          
        </Head>
        <body style={{overflowX:"hidden"}}>
          <Main />
          <div id="big_food_image" />
          <div id="portal"></div>
          <NextScript />
        </body>
      </Html>
    )
  }
}
