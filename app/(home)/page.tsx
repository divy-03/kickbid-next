
export default function Home() {
  console.log(process.env.DATABASE_URL);
  return (
    <div className="w-screen h-screen flex items-start justify-center">
      Hello Kickerz
    </div>
  );
}
