"use client";

import { motion } from "motion/react";
import { MapPin, Clock, CalendarRange, Wifi } from "lucide-react";

interface Step2Props {
  data: {
    dateStart: string;
    timeStart: string;
    dateEnd: string;
    timeEnd: string;
    multiDay: boolean;
    venue: string;
    address: string;
    city: string;
    capacity: string;
    isOnline: boolean;
    onlineUrl: string;
  };
  onChange: (field: string, value: string | boolean) => void;
}

const cities = [
  "Paris", "Lyon", "Marseille", "Toulouse", "Bordeaux",
  "Nantes", "Strasbourg", "Nice", "Rennes", "Montpellier",
  "Lille", "Cannes", "Autre",
];

export default function Step2DateTime({ data, onChange }: Step2Props) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col gap-8"
    >
      {/* Date & heure */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h3 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-base-content/50 flex items-center gap-2">
            <Clock size={12} className="text-primary/50" />
            Date &amp; Heure
          </h3>
          {/* Multi-day toggle */}
          <label className="flex items-center gap-2 cursor-pointer">
            <span className="text-[10px] uppercase tracking-wider text-base-content/30">
              Plusieurs jours
            </span>
            <input
              type="checkbox"
              className="toggle toggle-primary toggle-xs"
              checked={data.multiDay}
              onChange={(e) => onChange("multiDay", e.target.checked)}
            />
          </label>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="form-control gap-1.5">
            <label className="label py-0">
              <span className="label-text text-[10px] uppercase tracking-wider text-base-content/35">
                {data.multiDay ? "Date de début" : "Date"} <span className="text-primary">*</span>
              </span>
            </label>
            <input
              type="date"
              value={data.dateStart}
              onChange={(e) => onChange("dateStart", e.target.value)}
              className="input input-bordered w-full bg-base-300 border-primary/15 focus:border-primary/50 focus:outline-none text-sm rounded-xl h-11"
            />
          </div>
          <div className="form-control gap-1.5">
            <label className="label py-0">
              <span className="label-text text-[10px] uppercase tracking-wider text-base-content/35">
                Heure de début <span className="text-primary">*</span>
              </span>
            </label>
            <input
              type="time"
              value={data.timeStart}
              onChange={(e) => onChange("timeStart", e.target.value)}
              className="input input-bordered w-full bg-base-300 border-primary/15 focus:border-primary/50 focus:outline-none text-sm rounded-xl h-11"
            />
          </div>

          {data.multiDay && (
            <>
              <div className="form-control gap-1.5">
                <label className="label py-0">
                  <span className="label-text text-[10px] uppercase tracking-wider text-base-content/35">
                    Date de fin <span className="text-primary">*</span>
                  </span>
                </label>
                <input
                  type="date"
                  value={data.dateEnd}
                  onChange={(e) => onChange("dateEnd", e.target.value)}
                  className="input input-bordered w-full bg-base-300 border-primary/15 focus:border-primary/50 focus:outline-none text-sm rounded-xl h-11"
                />
              </div>
              <div className="form-control gap-1.5">
                <label className="label py-0">
                  <span className="label-text text-[10px] uppercase tracking-wider text-base-content/35">
                    Heure de fin
                  </span>
                </label>
                <input
                  type="time"
                  value={data.timeEnd}
                  onChange={(e) => onChange("timeEnd", e.target.value)}
                  className="input input-bordere w-full bg-base-300 border-primary/15 focus:border-primary/50 focus:outline-none text-sm rounded-xl h-11"
                />
              </div>
            </>
          )}

          {!data.multiDay && (
            <div className="form-control gap-1.5">
              <label className="label py-0">
                <span className="label-text text-[10px] uppercase tracking-wider text-base-content/35">
                  Heure de fin
                </span>
              </label>
              <input
                type="time"
                value={data.timeEnd}
                onChange={(e) => onChange("timeEnd", e.target.value)}
                className="input input-bordered w-full bg-base-300 border-primary/15 focus:border-primary/50 focus:outline-none text-sm rounded-xl h-11"
              />
            </div>
          )}
        </div>
      </div>

      <div className="divider divider-neutral opacity-40 my-0" />

      {/* Online toggle */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h3 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-base-content/50 flex items-center gap-2">
            <MapPin size={12} className="text-primary/50" />
            Lieu
          </h3>
          <label className="flex items-center gap-2 cursor-pointer">
            <Wifi size={12} className="text-primary/40" />
            <span className="text-[10px] uppercase tracking-wider text-base-content/30">
              Événement en ligne
            </span>
            <input
              type="checkbox"
              className="toggle toggle-primary toggle-xs"
              checked={data.isOnline}
              onChange={(e) => onChange("isOnline", e.target.checked)}
            />
          </label>
        </div>

        {data.isOnline ? (
          <div className="form-control flex flex-col w-full gap-2">
            <label className="label py-0">
              <span className="label-text text-[10px] uppercase tracking-wider text-base-content/35">
                URL de l&apos;événement <span className="text-primary">*</span>
              </span>
            </label>
            <input
              type="url"
              value={data.onlineUrl}
              onChange={(e) => onChange("onlineUrl", e.target.value)}
              placeholder="https://meet.google.com/xxx ou https://zoom.us/..."
              className="input input-bordered w-full bg-base-300 border-primary/15 focus:border-primary/50 focus:outline-none text-sm rounded-xl h-11 placeholder:text-base-content/20"
            />
            <div className="alert bg-primary/8 border border-primary/15 rounded-xl p-3 mt-1">
              <Wifi size={14} className="text-primary shrink-0" />
              <span className="text-xs text-base-content/50">
                Le lien sera partagé aux participants après confirmation de leur réservation.
              </span>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3">
            <div className="grid grid-cols-2 gap-3">
              <div className="form-control gap-1.5">
                <label className="label py-0">
                  <span className="label-text text-[10px] uppercase tracking-wider text-base-content/35">
                    Nom du lieu <span className="text-primary">*</span>
                  </span>
                </label>
                <input
                  type="text"
                  value={data.venue}
                  onChange={(e) => onChange("venue", e.target.value)}
                  placeholder="Ex : Philharmonie de Paris, Stade Vélodrome…"
                  className="input input-bordered bg-base-300 border-primary/15 focus:border-primary/50 focus:outline-none text-sm rounded-xl h-11 placeholder:text-base-content/20"
                />
              </div>

              <div className="form-control gap-1.5">
                <label className="label py-0">
                  <span className="label-text text-[10px] uppercase tracking-wider text-base-content/35">
                    Adresse complète
                  </span>
                </label>
                <input
                  type="text"
                  value={data.address}
                  onChange={(e) => onChange("address", e.target.value)}
                  placeholder="221, rue de l'Événement, 75000"
                  className="input input-bordered bg-base-300 border-primary/15 focus:border-primary/50 focus:outline-none text-sm rounded-xl h-11 placeholder:text-base-content/20"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="form-control gap-1.5">
                <label className="label py-0">
                  <span className="label-text text-[10px] uppercase tracking-wider text-base-content/35">
                    Ville <span className="text-primary">*</span>
                  </span>
                </label>
                <select
                  value={data.city}
                  onChange={(e) => onChange("city", e.target.value)}
                  className="select select-bordered bg-base-300 border-primary/15 focus:border-primary/50 focus:outline-none text-sm rounded-xl h-11 min-h-0"
                >
                  <option value="">Choisir…</option>
                  {cities.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-control gap-1.5">
                <label className="label py-0">
                  <span className="label-text text-[10px] uppercase tracking-wider text-base-content/35">
                    Capacité
                  </span>
                </label>
                <input
                  type="number"
                  min={1}
                  value={data.capacity}
                  onChange={(e) => onChange("capacity", e.target.value)}
                  placeholder="500"
                  className="input input-bordered bg-base-300 border-primary/15 focus:border-primary/50 focus:outline-none text-sm rounded-xl h-11 placeholder:text-base-content/20"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Quick info card */}
      <div className="alert bg-base-300 border border-primary/10 rounded-xl p-4">
        <CalendarRange size={16} className="text-primary shrink-0" />
        <div className="text-xs text-base-content/45 leading-relaxed">
          <strong className="text-base-content/60">Bon à savoir :</strong> Vous pourrez modifier les informations de date et de lieu jusqu&apos;à 24h avant le début de l&apos;événement.
        </div>
      </div>
    </motion.div>
  );
}
