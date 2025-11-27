import React from "react";

type NFTCardProps = {
  id: string;
  name?: string;
  image?: string;
  description?: string;
  onList?: () => void;
  onBuy?: () => void;
};

export default function NFTCard({ id, name, image, description, onList, onBuy }: NFTCardProps) {
  return (
    <div className="nft-card" style={{ border: "1px solid #ddd", padding: 12, borderRadius: 8 }}>
      <div style={{ height: 200, display: "flex", alignItems: "center", justifyContent: "center" }}>
        {image ? <img alt={name} src={image} style={{ maxWidth: "100%", maxHeight: "100%" }} /> : <div style={{ color: "#888" }}>No image</div>}
      </div>
      <div style={{ marginTop: 8 }}>
        <strong>{name ?? `NFT ${id}`}</strong>
        <div style={{ fontSize: 12, color: "#555" }}>{description}</div>
      </div>
      <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
        {onList && (
          <button className="btn" onClick={onList}>
            List
          </button>
        )}
        {onBuy && (
          <button onClick={onBuy} className="btn-primary">
            Buy
          </button>
        )}
      </div>
    </div>
  );
}
