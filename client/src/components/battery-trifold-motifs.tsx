import { Star } from "lucide-react";

export function TrifoldStarRow({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      data-trifold-motif="five-stars"
      className={`flex items-center gap-3 text-[#ffdc12] ${className}`}
    >
      {Array.from({ length: 5 }, (_, index) => (
        <Star
          key={index}
          data-trifold-star
          className="h-8 w-8 fill-current stroke-current max-[520px]:h-7 max-[520px]:w-7"
          strokeWidth={1.5}
        />
      ))}
    </div>
  );
}

export function TrifoldSoldierFlag({ className = "" }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      data-trifold-motif="soldier-flag"
      className={`relative ${className}`}
    >
      <img
        data-trifold-art
        src="/media/battles-budz-trifold-soldier.png"
        alt=""
        loading="lazy"
        decoding="async"
        draggable={false}
        className="h-full w-full object-contain object-bottom"
      />
    </div>
  );
}
