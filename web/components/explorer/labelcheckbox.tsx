import React, { useState, useEffect } from 'react';
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface Props {
  dimensions: string[];
  metrics: string[];
  handleCheckboxChange: (id: string) => any;
  handleCheckboxMetricChange: (id: string) => any;
  selectedDimensions: string[];
  selectedMetrics: string[];
}

export default function LabelCheckbox({ dimensions, metrics, handleCheckboxChange, handleCheckboxMetricChange, selectedDimensions, selectedMetrics }: Props) {


  function clickBox(e: any, type: string) {
    if (type === 'dimensions') {

      handleCheckboxChange(e.target.id);
    } else if (type === 'metrics') {
      handleCheckboxMetricChange(e.target.id);
    }
  }


  function renderCheckboxItems(items: string[], selectedItems: string[], onClick: (e: any) => void) {
    return items.map((value) => (
      <div className="grid gap-2" key={value}>
        <div className="grid grid-cols-3 items-center gap-4">
          <Checkbox id={value} onClick={onClick} checked={selectedItems.includes(value)} />
          <Label htmlFor="terms">{value}</Label>
        </div>
      </div>
    ));
  }

  return (
    <div>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">Column</Button>
        </PopoverTrigger>
        <PopoverContent className="w-30">
          <div className="grid gap-4">
            <div className="space-y-2">
              <h4 className="font-medium leading-none">Dimensions</h4>
              <p className="text-sm text-muted-foreground">
                Set the dimensions for the layer.
              </p>
            </div>
            {renderCheckboxItems(dimensions, selectedDimensions, (e) => clickBox(e, 'dimensions'))}

            <div className="grid gap-2">
              <div className="grid gap-4">
                <div className="space-y-2">
                  <h4 className="font-medium leading-none">Metrics</h4>
                  <p className="text-sm text-muted-foreground">
                    Set the Metrics for the layer.
                  </p>
                </div>
                {renderCheckboxItems(metrics, selectedMetrics, (e) => clickBox(e, 'metrics'))}
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
