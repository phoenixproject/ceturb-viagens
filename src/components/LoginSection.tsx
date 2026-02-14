import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Lock, User } from "lucide-react";
import { toast } from "sonner";

const LoginSection = () => {
  const [cpfCnpj, setCpfCnpj] = useState("");
  const [senha, setSenha] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cpfCnpj.trim() || !senha.trim()) {
      toast.error("Preencha todos os campos.");
      return;
    }
    toast.success("Login realizado com sucesso!");
    document.getElementById("agendamento")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="login" className="bg-secondary py-16 md:py-24">
      <div className="container flex justify-center">
        <Card className="w-full max-w-md animate-fade-in shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-foreground">Acesso ao Sistema</CardTitle>
            <CardDescription>Entre com suas credenciais para continuar</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="cpfcnpj">CPF/CNPJ</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="cpfcnpj"
                    placeholder="Digite seu CPF ou CNPJ"
                    value={cpfCnpj}
                    onChange={(e) => setCpfCnpj(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="senha">Senha</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="senha"
                    type="password"
                    placeholder="Digite sua senha"
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Button type="submit" className="w-full" size="lg">
                Entrar
              </Button>
            </form>
            <p className="mt-5 text-center text-xs text-muted-foreground">
              As credenciais de acesso são criadas no sistema de emissão de Boletos da CETURB.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default LoginSection;
