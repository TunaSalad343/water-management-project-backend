import { account } from "../models/account";
import { calculateAdditionalWaterRequiredPrice } from "./calculateAdditionalWaterRequiredPriceService";
import { getAccountById } from "./getAccountByIdService";

export function printBill(): any {
  return function (req: any, res: any) {
    const account = getAccountById(req.params.accountID);
    //api is called twice on the front end to re-render the page, so second call
    // is ignored so that account values are not double the value they should be
    if (account.getWaterAmount() !== 0 || account === ({} as account)) {
      return;
    }

    const initalWaterRequired = account.calculateInitalWaterRequired();
    account.addWater(initalWaterRequired);

    const initalWaterRequiredPrice = account.calculateInitalWaterPrice();
    account.addCost(initalWaterRequiredPrice);

    const additionalWaterRequired = account.calculateAdditionalWaterRequired();
    account.addWater(additionalWaterRequired);

    const additionalWaterRequiredPrice = calculateAdditionalWaterRequiredPrice(
      additionalWaterRequired
    );
    account.addCost(additionalWaterRequiredPrice);

    res.json({
      waterUsage: account.getWaterAmount(),
      cost: account.getCost(),
    });
  };
}