import { Bus } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t bg-secondary py-8">
      <div className="container flex flex-col items-center gap-3 text-center">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <Bus className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="text-sm font-bold text-foreground">CETURB</span>
        </div>
        <p className="text-sm text-muted-foreground">
          CETURB – Companhia Estadual de Transportes Urbanos
        </p>
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
