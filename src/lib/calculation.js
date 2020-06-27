const CURR_CONV = 1;

export function calcKPIAndOutcome(avgOrderValue, feesValue, cogsValue, purchasedValue, checkoutValue, avgCartValue, profitTargetValue){
  let costPerPurchase =  (avgOrderValue *(100-feesValue)/100-cogsValue)*CURR_CONV;
  let costInitiateCheckout = (costPerPurchase*purchasedValue/checkoutValue);
  let costPerAddTocart = costPerPurchase*purchasedValue/avgCartValue;
  let costPerViewContent = costPerPurchase*purchasedValue/100;
  let arrBreakevenKpi = [costPerPurchase, costInitiateCheckout, costPerAddTocart, costPerViewContent];

  let ptCostPerPurchase = (avgOrderValue*(100-feesValue)/100-cogsValue-avgOrderValue*(profitTargetValue/100)) * CURR_CONV  ;
  let ptCostInitiateCheckout = (ptCostPerPurchase*purchasedValue/checkoutValue);
  let ptCostPerAddTocart = ptCostPerPurchase*purchasedValue/avgCartValue;
  let ptCostPerViewContent = ptCostPerPurchase*purchasedValue/100;
  let arrProfitTargetKpi = [ptCostPerPurchase, ptCostInitiateCheckout, ptCostPerAddTocart, ptCostPerViewContent];

  let returnOnAdSpent =  avgOrderValue/(avgOrderValue - cogsValue -avgOrderValue *feesValue/100);
  let arrBeROAS = [returnOnAdSpent];

  let ptReturnOnAdSpent = avgOrderValue /(ptCostPerPurchase/CURR_CONV);
  let arrPtROAS = [ptReturnOnAdSpent];

  let baselinePURConvRate =parseFloat((1/avgOrderValue)*100).toFixed(2);
  let arrBPUR = [baselinePURConvRate];
  
  return {arrBreakevenKpi: arrBreakevenKpi,arrProfitTargetKpi: arrProfitTargetKpi,arrBeROAS: arrBeROAS,arrPtROAS: arrPtROAS,arrBPUR: arrBPUR};
}


