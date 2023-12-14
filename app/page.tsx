"use client";

import React, { useMemo, useState } from "react";
import { TextField } from "@radix-ui/themes";
import LodashList from "./components/lodash_list";
import Content from "./components/content";

export default function Home() {
  const [search, setSearch] = useState("");
  const [currentKey, setCurrentKey] = useState<string>("VERSION");
  const [params, setParams] = useState("");

  const [args, argsError] = useMemo(() => {
    try {
      return [JSON.parse(`[${params}]`), ""];
    } catch (e: any) {
      return [[], e.toString()];
    }
  }, [params]);

  return (
    <div className="flex gap-4 font-mono h-[100vh]">
      <div className="flex-1 border-r px-4 overflow-y-auto">
        <div>
          <div className="mb-4 sticky top-0 pt-4 bg-white">
            <TextField.Root>
              <TextField.Slot>🔍</TextField.Slot>
              <TextField.Input
                placeholder="Search the functions"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </TextField.Root>
          </div>
          <LodashList
            current={currentKey}
            search={search}
            onChange={(v) => {
              setCurrentKey(v);
            }}
          />
        </div>
      </div>

      <div className="flex-[3] border-l p-4 overflow-y-auto">
        <Content
          params={params}
          args={args}
          argsError={argsError}
          current={currentKey}
          onParamsChange={(v) => {
            setParams(v);
          }}
        />
      </div>
    </div>
  );
}
