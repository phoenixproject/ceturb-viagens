import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Plus, Trash2, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import TripMap from "./TripMap";

interface Passenger {
  name: string;
  docType: string;
  document: string;
}

const trips = [
  {
    id: 1,
    origin: "Vitória",
    destination: "Vila Velha",
    vehicle: "Ônibus 4521",
    cnpj: "12.345.678/0001-90",
    departure: "2026-02-15 08:00",
    arrival: "2026-02-15 09:30",
    originCoords: [-20.3155, -40.3128] as [number, number],
    destCoords: [-20.3297, -40.2925] as [number, number],
  },
  {
    id: 2,
    origin: "Serra",
    destination: "Cariacica",
    vehicle: "Ônibus 7890",
    cnpj: "98.765.432/0001-10",
    departure: "2026-02-16 07:00",
    arrival: "2026-02-16 08:45",
    originCoords: [-20.1209, -40.3075] as [number, number],
    destCoords: [-20.2635, -40.4165] as [number, number],
  },
  {
    id: 3,
    origin: "Guarapari",
    destination: "Vitória",
    vehicle: "Micro-ônibus 1234",
    cnpj: "11.222.333/0001-44",
    departure: "2026-02-17 06:30",
    arrival: "2026-02-17 08:00",
    originCoords: [-20.6736, -40.4997] as [number, number],
    destCoords: [-20.3155, -40.3128] as [number, number],
  },
];

const TripScheduling = () => {
  const [openMapId, setOpenMapId] = useState<number | null>(null);
  const [passengers, setPassengers] = useState<Passenger[]>([]);
  const [name, setName] = useState("");
  const [docType, setDocType] = useState("");
  const [document, setDocument] = useState("");

  const toggleMap = (id: number) => {
    setOpenMapId((prev) => (prev === id ? null : id));
  };

  const addPassenger = () => {
    if (!name.trim() || !docType || !document.trim()) {
      toast.error("Preencha todos os campos do passageiro.");
      return;
    }
    setPassengers((prev) => [...prev, { name: name.trim(), docType, document: document.trim() }]);
    setName("");
    setDocType("");
    setDocument("");
    toast.success("Passageiro adicionado.");
  };

  const removePassenger = (index: number) => {
    setPassengers((prev) => prev.filter((_, i) => i !== index));
  };

  const confirmSchedule = () => {
    toast.success("Viagem comunicada com sucesso à CETURB.", {
      icon: <CheckCircle2 className="h-5 w-5 text-accent" />,
    });
  };

  return (
    <section id="agendamento" className="bg-background py-16 md:py-24">
      <div className="container space-y-10">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-foreground md:text-3xl">Agendamento de Viagem</h2>
          <p className="mt-2 text-muted-foreground">Visualize viagens e cadastre passageiros</p>
        </div>

        {/* Trips Table */}
        <Card className="overflow-hidden shadow-lg">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-secondary">
                    <TableHead>Origem</TableHead>
                    <TableHead>Destino</TableHead>
                    <TableHead>Veículo</TableHead>
                    <TableHead>CNPJ</TableHead>
                    <TableHead>Partida</TableHead>
                    <TableHead>Chegada</TableHead>
                    <TableHead className="text-center">Ações</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {trips.map((trip) => (
                    <>
                      <TableRow key={trip.id} className="hover:bg-secondary/50">
                        <TableCell className="font-medium">{trip.origin}</TableCell>
                        <TableCell>{trip.destination}</TableCell>
                        <TableCell>{trip.vehicle}</TableCell>
                        <TableCell className="font-mono text-xs">{trip.cnpj}</TableCell>
                        <TableCell className="text-sm">{trip.departure}</TableCell>
                        <TableCell className="text-sm">{trip.arrival}</TableCell>
                        <TableCell className="text-center">
                          <Button
                            variant={openMapId === trip.id ? "default" : "outline"}
                            size="sm"
                            onClick={() => toggleMap(trip.id)}
                            className="gap-1.5"
                          >
                            <MapPin className="h-3.5 w-3.5" />
                            Ver Mapa
                          </Button>
                        </TableCell>
                      </TableRow>
                      {openMapId === trip.id && (
                        <TableRow key={`map-${trip.id}`}>
                          <TableCell colSpan={7} className="p-4">
                            <TripMap
                              origin={trip.originCoords}
                              destination={trip.destCoords}
                              originLabel={trip.origin}
                              destinationLabel={trip.destination}
                            />
                          </TableCell>
                        </TableRow>
                      )}
                    </>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>

        {/* Passenger Form */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-xl text-foreground">Cadastro de Passageiros</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="space-y-2">
                <Label htmlFor="pname">Nome do passageiro</Label>
                <Input
                  id="pname"
                  placeholder="Nome completo"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Tipo de documento</Label>
                <Select value={docType} onValueChange={setDocType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="CPF">CPF</SelectItem>
                    <SelectItem value="RG">RG</SelectItem>
                    <SelectItem value="Passaporte">Passaporte</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="pdoc">Documento</Label>
                <Input
                  id="pdoc"
                  placeholder="Nº do documento"
                  value={document}
                  onChange={(e) => setDocument(e.target.value)}
                />
              </div>
              <div className="flex items-end">
                <Button onClick={addPassenger} className="w-full gap-1.5">
                  <Plus className="h-4 w-4" />
                  Adicionar Passageiro
                </Button>
              </div>
            </div>

            {passengers.length > 0 && (
              <div className="overflow-x-auto rounded-lg border">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-secondary">
                      <TableHead>Nome</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Documento</TableHead>
                      <TableHead className="text-center">Ação</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {passengers.map((p, i) => (
                      <TableRow key={i}>
                        <TableCell className="font-medium">{p.name}</TableCell>
                        <TableCell>{p.docType}</TableCell>
                        <TableCell className="font-mono text-sm">{p.document}</TableCell>
                        <TableCell className="text-center">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removePassenger(i)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}

            <div className="flex justify-end">
              <Button
                size="lg"
                onClick={confirmSchedule}
                className="gap-2 bg-accent text-accent-foreground hover:bg-accent/90"
              >
                <CheckCircle2 className="h-4 w-4" />
                Confirmar Agendamento
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default TripScheduling;
