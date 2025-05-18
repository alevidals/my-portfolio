import Image from "next/image";

export default async function Home() {
  return (
    <div className="flex items-center justify-center  h-full">
      <div>
        <h1 className="text-2xl md:text-5xl font-extrabold">
          Welcome to MyPortfolio
        </h1>
        <h2 className="md:text-2xl mt-4">
          The place where you can create your portfolio and CV at the same time
          🚀
        </h2>
        <Image
          src="/programmer.svg"
          alt="programmer"
          width={500}
          height={500}
          className="mt-8"
        />
      </div>
    </div>
  );
}
