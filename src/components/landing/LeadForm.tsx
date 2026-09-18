"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { trackEvent, getOrCreateSessionId, getAcquisitionParams } from "@/lib/tracking";
import { pushLeadEvent } from "@/lib/pixel";
import { maskWhatsapp, isValidWhatsapp, cn } from "@/lib/utils";
import { FATURAMENTO_OPCOES, DIFICULDADE_OPCOES } from "@/lib/validation";

type Plataforma = "ifood" | "99food" | "keeta" | "nenhuma";

const PLATAFORMA_LABELS: Record<Plataforma, string> = {
  ifood: "iFood",
  "99food": "99Food",
  keeta: "Keeta",
  nenhuma: "Ainda não estou nas plataformas",
};

type Step1Errors = Partial<Record<"nome" | "whatsapp" | "nomeLoja", string>>;
type Step2Errors = Partial<
  Record<"cidadeUf" | "plataformas" | "faturamentoMensal" | "dificuldadePrincipal" | "consentimentoWhatsapp", string>
>;

export default function LeadForm({ compact = false, asSection = true }: { compact?: boolean; asSection?: boolean }) {
  const router = useRouter();
  const formStartedAt = useRef(Date.now());
  const hasFiredFormStart = useRef(false);

  const [step, setStep] = useState<1 | 2>(1);
  const [leadId, setLeadId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const [nome, setNome] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [nomeLoja, setNomeLoja] = useState("");
  const [honeypot1, setHoneypot1] = useState("");
  const [step1Errors, setStep1Errors] = useState<Step1Errors>({});

  const [cidadeUf, setCidadeUf] = useState("");
  const [plataformas, setPlataformas] = useState<Plataforma[]>([]);
  const [faturamentoMensal, setFaturamentoMensal] = useState("");
  const [dificuldadePrincipal, setDificuldadePrincipal] = useState("");
  const [consentimento, setConsentimento] = useState(false);
  const [honeypot2, setHoneypot2] = useState("");
  const [step2Errors, setStep2Errors] = useState<Step2Errors>({});

  function onFieldFocus() {
    if (!hasFiredFormStart.current) {
      hasFiredFormStart.current = true;
      trackEvent("form_start");
    }
  }

  function togglePlataforma(p: Plataforma) {
    setPlataformas((prev) => {
      if (p === "nenhuma") {
        return prev.includes("nenhuma") ? [] : ["nenhuma"];
      }
      const withoutNenhuma = prev.filter((item) => item !== "nenhuma");
      if (withoutNenhuma.includes(p)) {
        return withoutNenhuma.filter((item) => item !== p);
      }
      return [...withoutNenhuma, p];
    });
  }

  function validateStep1(): boolean {
    const errors: Step1Errors = {};
    if (nome.trim().length < 2) errors.nome = "Informe seu nome completo";
    if (!isValidWhatsapp(whatsapp)) errors.whatsapp = "Informe um WhatsApp válido com DDD";
    if (nomeLoja.trim().length < 2) errors.nomeLoja = "Informe o nome da loja";
    setStep1Errors(errors);
    return Object.keys(errors).length === 0;
  }

  function validateStep2(): boolean {
    const errors: Step2Errors = {};
    if (cidadeUf.trim().length < 2) errors.cidadeUf = "Informe cidade/UF";
    if (plataformas.length === 0) errors.plataformas = "Selecione ao menos uma opção";
    if (!faturamentoMensal) errors.faturamentoMensal = "Selecione uma opção";
    if (!dificuldadePrincipal) errors.dificuldadePrincipal = "Selecione uma opção";
    if (!consentimento) errors.consentimentoWhatsapp = "É necessário autorizar o contato pelo WhatsApp";
    setStep2Errors(errors);
    return Object.keys(errors).length === 0;
  }

  async function handleStep1Submit(e: React.FormEvent) {
    e.preventDefault();
    if (loading) return;
    if (!validateStep1()) return;

    setLoading(true);
    setSubmitError(null);
    try {
      const sessionId = getOrCreateSessionId();
      const acquisition = getAcquisitionParams();
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          step: 1,
          nome: nome.trim(),
          whatsapp,
          nomeLoja: nomeLoja.trim(),
          sessionId,
          ...acquisition,
          honeypot: honeypot1,
          formStartedAt: formStartedAt.current,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setSubmitError(data.error ?? "Não foi possível continuar. Tente novamente.");
        return;
      }
      setLeadId(data.leadId);
      setStep(2);
      formStartedAt.current = Date.now();
    } catch {
      setSubmitError("Não foi possível continuar. Verifique sua conexão e tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  async function handleStep2Submit(e: React.FormEvent) {
    e.preventDefault();
    if (loading || !leadId) return;
    if (!validateStep2()) return;

    setLoading(true);
    setSubmitError(null);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          step: 2,
          leadId,
          cidadeUf: cidadeUf.trim(),
          plataformas,
          faturamentoMensal,
          dificuldadePrincipal,
          consentimentoWhatsapp: consentimento,
          honeypot: honeypot2,
          formStartedAt: formStartedAt.current,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setSubmitError(data.error ?? "Não foi possível enviar. Tente novamente.");
        return;
      }
      pushLeadEvent();
      router.push(`/obrigado?lead=${leadId}`);
    } catch {
      setSubmitError("Não foi possível enviar. Verifique sua conexão e tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  const inputClasses =
    "w-full min-h-[48px] rounded-control border border-white/15 bg-white/5 px-4 py-3 text-branco-clareza placeholder:text-branco-clareza/40 outline-none transition-colors focus:border-laranja-impulso";
  const labelClasses = "mb-1.5 block text-sm font-medium text-branco-clareza/85";
  const errorClasses = "mt-1 text-xs text-red-400";

  return (
    <div
      id={asSection ? "formulario" : undefined}
      data-section={asSection ? "formulario" : undefined}
      className={cn(
        "rounded-card border border-laranja-impulso/25 bg-surface p-5 sm:p-7 shadow-[0_20px_60px_-24px_rgba(0,0,0,0.7)]",
        compact ? "w-full" : "w-full max-w-md"
      )}
    >
      <div className="mb-5">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-laranja-impulso">
          Etapa {step} de 2
        </p>
        <div className="flex gap-1.5" role="progressbar" aria-valuenow={step} aria-valuemin={1} aria-valuemax={2}>
          <span className={cn("h-1.5 flex-1 rounded-full", "bg-laranja-impulso")} />
          <span className={cn("h-1.5 flex-1 rounded-full", step === 2 ? "bg-laranja-impulso" : "bg-white/10")} />
        </div>
      </div>

      {step === 1 ? (
        <form onSubmit={handleStep1Submit} noValidate>
          <div className="space-y-4">
            <div>
              <label htmlFor="nome" className={labelClasses}>
                Nome completo
              </label>
              <input
                id="nome"
                name="nome"
                type="text"
                autoComplete="name"
                className={inputClasses}
                value={nome}
                onFocus={onFieldFocus}
                onChange={(e) => setNome(e.target.value)}
                aria-invalid={Boolean(step1Errors.nome)}
                aria-describedby={step1Errors.nome ? "nome-erro" : undefined}
                required
              />
              {step1Errors.nome && (
                <p id="nome-erro" className={errorClasses}>
                  {step1Errors.nome}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="whatsapp" className={labelClasses}>
                WhatsApp com DDD
              </label>
              <input
                id="whatsapp"
                name="whatsapp"
                type="tel"
                inputMode="numeric"
                autoComplete="tel"
                placeholder="(00) 00000-0000"
                className={inputClasses}
                value={whatsapp}
                onFocus={onFieldFocus}
                onChange={(e) => setWhatsapp(maskWhatsapp(e.target.value))}
                aria-invalid={Boolean(step1Errors.whatsapp)}
                aria-describedby={step1Errors.whatsapp ? "whatsapp-erro" : undefined}
                required
              />
              {step1Errors.whatsapp && (
                <p id="whatsapp-erro" className={errorClasses}>
                  {step1Errors.whatsapp}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="nomeLoja" className={labelClasses}>
                Nome da loja
              </label>
              <input
                id="nomeLoja"
                name="nomeLoja"
                type="text"
                autoComplete="organization"
                className={inputClasses}
                value={nomeLoja}
                onFocus={onFieldFocus}
                onChange={(e) => setNomeLoja(e.target.value)}
                aria-invalid={Boolean(step1Errors.nomeLoja)}
                aria-describedby={step1Errors.nomeLoja ? "loja-erro" : undefined}
                required
              />
              {step1Errors.nomeLoja && (
                <p id="loja-erro" className={errorClasses}>
                  {step1Errors.nomeLoja}
                </p>
              )}
            </div>

            {/* honeypot — campo invisível para humanos, atrativo para bots */}
            <div aria-hidden="true" className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden">
              <label htmlFor="website">Deixe em branco</label>
              <input
                id="website"
                name="website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={honeypot1}
                onChange={(e) => setHoneypot1(e.target.value)}
              />
            </div>

            {submitError && <p className="text-sm text-red-400">{submitError}</p>}

            <button
              type="submit"
              disabled={loading}
              className="min-h-[48px] w-full rounded-control bg-laranja-impulso font-heading text-sm font-semibold text-preto-direcao transition-opacity hover:brightness-110 disabled:opacity-60"
            >
              {loading ? "Enviando..." : "Continuar"}
            </button>
          </div>
        </form>
      ) : (
        <form onSubmit={handleStep2Submit} noValidate>
          <div className="space-y-4">
            <div>
              <label htmlFor="cidadeUf" className={labelClasses}>
                Cidade/UF
              </label>
              <input
                id="cidadeUf"
                name="cidadeUf"
                type="text"
                placeholder="Salvador/BA"
                className={inputClasses}
                value={cidadeUf}
                onChange={(e) => setCidadeUf(e.target.value)}
                aria-invalid={Boolean(step2Errors.cidadeUf)}
                aria-describedby={step2Errors.cidadeUf ? "cidade-erro" : undefined}
                required
              />
              {step2Errors.cidadeUf && (
                <p id="cidade-erro" className={errorClasses}>
                  {step2Errors.cidadeUf}
                </p>
              )}
            </div>

            <fieldset>
              <legend className={labelClasses}>Plataformas em que atua</legend>
              <div className="grid grid-cols-2 gap-2">
                {(Object.keys(PLATAFORMA_LABELS) as Plataforma[]).map((p) => (
                  <label
                    key={p}
                    className={cn(
                      "flex min-h-[48px] cursor-pointer items-center gap-2 rounded-control border px-3 py-2 text-sm transition-colors",
                      plataformas.includes(p)
                        ? "border-laranja-impulso bg-laranja-impulso/10"
                        : "border-white/15 bg-white/5"
                    )}
                  >
                    <input
                      type="checkbox"
                      className="h-4 w-4 accent-laranja-impulso"
                      checked={plataformas.includes(p)}
                      onChange={() => togglePlataforma(p)}
                    />
                    {PLATAFORMA_LABELS[p]}
                  </label>
                ))}
              </div>
              {step2Errors.plataformas && <p className={errorClasses}>{step2Errors.plataformas}</p>}
            </fieldset>

            <div>
              <label htmlFor="faturamento" className={labelClasses}>
                Faturamento mensal aproximado nas plataformas
              </label>
              <select
                id="faturamento"
                name="faturamento"
                className={inputClasses}
                value={faturamentoMensal}
                onChange={(e) => setFaturamentoMensal(e.target.value)}
                aria-invalid={Boolean(step2Errors.faturamentoMensal)}
                required
              >
                <option value="" disabled>
                  Selecione uma opção
                </option>
                {FATURAMENTO_OPCOES.map((opcao) => (
                  <option key={opcao} value={opcao}>
                    {opcao}
                  </option>
                ))}
              </select>
              {step2Errors.faturamentoMensal && <p className={errorClasses}>{step2Errors.faturamentoMensal}</p>}
            </div>

            <div>
              <label htmlFor="dificuldade" className={labelClasses}>
                Principal dificuldade hoje
              </label>
              <select
                id="dificuldade"
                name="dificuldade"
                className={inputClasses}
                value={dificuldadePrincipal}
                onChange={(e) => setDificuldadePrincipal(e.target.value)}
                aria-invalid={Boolean(step2Errors.dificuldadePrincipal)}
                required
              >
                <option value="" disabled>
                  Selecione uma opção
                </option>
                {DIFICULDADE_OPCOES.map((opcao) => (
                  <option key={opcao} value={opcao}>
                    {opcao}
                  </option>
                ))}
              </select>
              {step2Errors.dificuldadePrincipal && <p className={errorClasses}>{step2Errors.dificuldadePrincipal}</p>}
            </div>

            <div>
              <label className="flex items-start gap-2.5 text-sm text-branco-clareza/85">
                <input
                  type="checkbox"
                  className="mt-0.5 h-4 w-4 accent-laranja-impulso"
                  checked={consentimento}
                  onChange={(e) => setConsentimento(e.target.checked)}
                  required
                />
                <span>
                  Autorizo a MiBusca a entrar em contato pelo WhatsApp informado.{" "}
                  <a href="/privacidade" className="underline decoration-laranja-impulso/60 underline-offset-2">
                    Política de privacidade
                  </a>
                </span>
              </label>
              {step2Errors.consentimentoWhatsapp && <p className={errorClasses}>{step2Errors.consentimentoWhatsapp}</p>}
            </div>

            <div aria-hidden="true" className="absolute -left-[9999px] top-auto h-px w-px overflow-hidden">
              <label htmlFor="website2">Deixe em branco</label>
              <input
                id="website2"
                name="website2"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={honeypot2}
                onChange={(e) => setHoneypot2(e.target.value)}
              />
            </div>

            {submitError && <p className="text-sm text-red-400">{submitError}</p>}

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="min-h-[48px] rounded-control border border-white/15 px-4 text-sm font-medium text-branco-clareza/80"
              >
                Voltar
              </button>
              <button
                type="submit"
                disabled={loading}
                className="min-h-[48px] flex-1 rounded-control bg-laranja-impulso font-heading text-sm font-semibold text-preto-direcao transition-opacity hover:brightness-110 disabled:opacity-60"
              >
                {loading ? "Enviando..." : "Quero falar com um especialista"}
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
