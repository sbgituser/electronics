/**
 * AdSlot.tsx
 *
 * Google AdSense 広告枠プレースホルダー。
 * AdSense承認後にスクリプトを有効化する。
 *
 * 使い方:
 *   <AdSlot slot="1234567890" format="auto" />
 *
 * 現在は非表示（AdSense未承認）。
 * 承認後、ADSENSE_ENABLED を true に変更し、layout.tsx に AdSense スクリプトタグを追加する。
 */

const ADSENSE_ENABLED = false;

const ADSENSE_CLIENT = "ca-pub-8412407485609118";

interface Props {
  slot: string;
  format?: string;
  className?: string;
}

export default function AdSlot({ slot, format = "auto", className = "" }: Props) {
  if (!ADSENSE_ENABLED) {
    return null;
  }

  return (
    <div className={`ad-slot ${className}`}>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={ADSENSE_CLIENT}
        data-ad-format={format}
        data-ad-slot={slot}
        data-full-width-responsive="true"
      />
    </div>
  );
}
