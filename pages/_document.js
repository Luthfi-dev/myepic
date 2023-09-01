import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <meta content="thinkepic CMS" name="description"></meta>
          <meta content="cms" name="keywords"></meta>

          {/* <!-- Favicons --> */}
          <link href="/assets/img/favicon.png" rel="icon"></link>
          <link
            href="/assets/img/apple-touch-icon.png"
            rel="apple-touch-icon"
          ></link>

          {/* <!-- Google Fonts --> */}
          <link href="https://fonts.gstatic.com" rel="preconnect"></link>
          <link
            href="https://fonts.googleapis.com/css?family=Open+Sans:300,300i,400,400i,600,600i,700,700i|Nunito:300,300i,400,400i,600,600i,700,700i|Poppins:300,300i,400,400i,500,500i,600,600i,700,700i&display=optional"
            rel="stylesheet"
          ></link>

          {/* <!-- Vendor CSS Files --> */}
          <link
            href="/assets/vendor/bootstrap/css/bootstrap.min.css"
            rel="stylesheet"
          ></link>
          <link
            href="/assets/vendor/bootstrap-icons/bootstrap-icons.css"
            rel="stylesheet"
          ></link>
          <link
            href="/assets/vendor/boxicons/css/boxicons.min.css"
            rel="stylesheet"
          ></link>
          <link
            href="/assets/vendor/quill/quill.snow.css"
            rel="stylesheet"
          ></link>
          <link
            href="/assets/vendor/quill/quill.bubble.css"
            rel="stylesheet"
          ></link>
          <link
            href="/assets/vendor/remixicon/remixicon.css"
            rel="stylesheet"
          ></link>
          <link
            href="/assets/vendor/simple-datatables/style.css"
            rel="stylesheet"
          ></link>

          {/* <!-- Template Main CSS File --> */}
          <link href="/assets/css/style.css" rel="stylesheet" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
