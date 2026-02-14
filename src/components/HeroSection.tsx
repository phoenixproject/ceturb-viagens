import heroBus from "@/assets/hero-bus.jpg";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const HeroSection = () => {
  const scrollToLogin = () => {
    document.getElementById("login")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative overflow-hidden bg-background py-16 md:py-24">
      <div className="container">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div className="animate-fade-in space-y-6">
            <h1 className="text-3xl font-bold leading-tight tracking-tight text-foreground md:text-4xl lg:text-5xl">
              Comunicado de Viagem de Serviços de{" "}
              <span className="text-primary">Fretamento</span>
            </h1>
            <p className="max-w-lg text-lg text-muted-foreground">
              Sistema oficial para comunicação e agendamento de viagens fretadas.
            </p>
            <Button size="lg" onClick={scrollToLogin} className="gap-2">
              Acessar o Sistema
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
          <div className="animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <img
              src={heroBus}
              alt="Ônibus de fretamento em uma estrada com mapa e cidade ao fundo"
              className="w-full rounded-xl border shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
