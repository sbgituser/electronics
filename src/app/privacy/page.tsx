import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "プライバシーポリシー",
};

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-slate-800 mb-6">
        プライバシーポリシー
      </h1>

      <div className="space-y-6 text-slate-600 text-sm leading-relaxed">
        <section>
          <h2 className="font-bold text-slate-800 text-base mb-2">
            個人情報の取り扱い
          </h2>
          <p>
            {SITE_NAME}（以下「当サイト」）は、お問い合わせフォーム等から取得した個人情報を、
            お問い合わせへの回答以外の目的で使用しません。
          </p>
        </section>

        <section>
          <h2 className="font-bold text-slate-800 text-base mb-2">
            アクセス解析
          </h2>
          <p>
            当サイトでは、Google Analytics を使用してアクセス解析を行っています。
            Google Analytics はCookieを使用してデータを収集しますが、個人を特定する情報は収集しません。
          </p>
        </section>

        <section>
          <h2 className="font-bold text-slate-800 text-base mb-2">
            広告について
          </h2>
          <p>
            当サイトでは、Google AdSenseおよびAmazonアソシエイト・プログラムを利用しています。
            これらのサービスはCookieを使用して、ユーザーに関連性の高い広告を表示します。
          </p>
        </section>

        <section>
          <h2 className="font-bold text-slate-800 text-base mb-2">
            免責事項
          </h2>
          <p>
            当サイトの情報は、できる限り正確な情報を提供するよう努めていますが、
            正確性や安全性を保証するものではありません。
            当サイトの情報を参考にした際に生じた損害について、当サイトは一切の責任を負いません。
          </p>
        </section>

        <p className="text-slate-400 text-xs">
          最終更新日: 2026年3月28日
        </p>
      </div>
    </div>
  );
}
