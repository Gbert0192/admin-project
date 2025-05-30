import Image from "next/image";
import Link from "next/link";
import React from "react";
import styles from "./unauthorized.module.css";

const UnauthorizedPageFromDesign: React.FC = () => (
  <div className={styles.container}>
    <div style={{ position: "relative", width: "700px", height: "600px" }}>
      <Image
        src="/images/unauthorized_illustration.png"
        alt="Unauthorized Access Illustration"
        layout="fill"
        objectFit="contain"
        className={styles.illustration}
      />
    </div>

    <h1 className={styles.title}>We are Sorry...</h1>
    <p className={styles.message}>
      The page you&apos;re trying to access has restricted access.
      <br />
      Please refer to your system administrator
    </p>

    <Link href="/" legacyBehavior>
      <a className={styles.goBackButton}>Go Back</a>
    </Link>
  </div>
);

export default UnauthorizedPageFromDesign;
