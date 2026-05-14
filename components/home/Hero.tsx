export default function Hero() {
  return (
    <section
      className="relative min-h-[480px] md:min-h-[560px] flex items-center justify-center text-white"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.25),rgba(0,0,0,0.35)), url('https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=2000&q=80')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="container-x text-center md:text-right md:pr-24">
        <h1 className="text-3xl md:text-6xl font-medium leading-snug tracking-wide drop-shadow">
          實驗支持的<br />足量強效配方
        </h1>
        <p className="mt-4 md:mt-6 text-base md:text-xl tracking-widest">
          – 1~2個月 快速有感 –
        </p>
      </div>
    </section>
  );
}
