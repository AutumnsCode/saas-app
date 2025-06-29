"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { formUrlQuery, removeKeysFromUrlQuery } from "@jsmastery/utils";

const SearchInput = () => {
  //Holt den aktuellen Pfad
  const pathname = usePathname();
  // Ermöglicht das manuelle Navigieren zur neuen URL
  const router = useRouter();
  //Gibt die aktuellen URL-Parameter zurück
  const searchParams = useSearchParams();
  // Holt den Wert des Parameters "topic", wenn vorhanden
  const query = searchParams.get("topic") || "";

  // Lokaler Zustand für das, was im Inputfeld eingetippt wird
  const [searchQuery, setSearchQuery] = useState("");

  /*
   * Wenn sich searchQuery ändert, wird useEffect ausgeführt
   * Wenn es sich der Suchbegriff vorhanden ist, wird es der URL als Query-Parameter hinzugefügt
   * Oder Wenn das Eingabefeld leer ist, wird der "topic"-Parameter entfernt
   * Anschließend Navigiert zur neuen URL ohne Seiten-Scroll
   * wartet 500ms, bevor die URL geändert wird
   * */
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchQuery) {
        const newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: "topic",
          value: searchQuery,
        });

        router.push(newUrl, { scroll: false });
      } else {
        const newUrl = removeKeysFromUrlQuery({
          params: searchParams.toString(),
          keysToRemove: ["topic"],
        });

        router.push(newUrl, { scroll: false });
      }
    }, 500);
  }, [searchQuery, router, searchParams, pathname]);

  return (
    <div className="relative border border-black rounded-lg items-center flex gap-2 px-2 py-1 h-fit">
      <Image src="/icons/search.svg" alt="search" width={15} height={15} />
      <input
        placeholder="Search companions ..."
        className="outline-none"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  );
};
export default SearchInput;
