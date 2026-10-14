// app/(authenticated)/proposal/utils/fillSolarEquipmentFields.ts
import calculateMonthlyGeneration from "./calculateMonthlyGeneration";

export function fillEquipmentFields(
    form: any,
    payload: Record<string, FormDataEntryValue>
    ) {
    const qtdPanel = Number(payload.panelQuantity);
    const PanelPower = Number(payload.panelPower);
    const totalKwp = (qtdPanel * PanelPower) / 1000;
    const monthlyGeneration = calculateMonthlyGeneration(totalKwp);
        
    form.getTextField("panelQuantity")
    .setText(payload.panelQuantity as string);
    
    form.getTextField("panelPower").
    setText(`${payload.panelPower} W`);
    
    form.getTextField("inverterBrand").
    setText(payload.inverterBrand as string);
    
    form.getTextField("inverterPower").
    setText(`${payload.inverterPower} kW`);
  
    form.getTextField("kwp").setText(`${totalKwp} kWp`);

    form.getTextField("kwh").setText(`${monthlyGeneration} kWh`)
    
    
}