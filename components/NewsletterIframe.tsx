"use client";

import { useEffect, useRef } from "react";

export default function NewsletterIframe({
  htmlContent,
}: {
  htmlContent: string;
}) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    // iframe 내부 콘텐츠 높이에 맞춰 높이 조절 함수
    const resizeIframe = () => {
      if (iframe.contentWindow) {
        // 약간의 여유분(+20px)을 주어 스크롤바 원천 차단
        iframe.style.height =
          iframe.contentWindow.document.body.scrollHeight + 20 + "px";
      }
    };

    // 로드 시 실행
    iframe.addEventListener("load", resizeIframe);

    // 윈도우 리사이즈 시에도 실행 (반응형 대응)
    window.addEventListener("resize", resizeIframe);

    return () => {
      iframe.removeEventListener("load", resizeIframe);
      window.removeEventListener("resize", resizeIframe);
    };
  }, []);

  return (
    <iframe
      ref={iframeRef}
      srcDoc={htmlContent}
      className="w-full border-none block"
      title="Newsletter Content"
      // 초기 높이 설정 (로딩 중 깜빡임 방지용, 적당히 크게)
      style={{ minHeight: "600px" }}
    />
  );
}
