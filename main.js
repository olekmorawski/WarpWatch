import Bundlr from "@bundlr-network/client";
import * as fs from "fs";
import dotenv from "dotenv";

dotenv.config();

async function main() {
  // 1. Connect to the Bundlr network.
  const bundlr = new Bundlr(
    "https://devnet.bundlr.network",
    "matic",
    process.env.PRIVATE_KEY,
    {
      providerUrl:
        "https://polygon-mumbai.g.alchemy.com/v2/kmFSLZCO-IFXkMQbFSMWiFG8ivC8Hw5N",
    }
  );

  // 2. Display the connected wallet address.
  console.log(`Connected to node, wallet address is ${bundlr.address}`);

  // 4. Calculate and display the cost of uploading a specific file.
  const pathToFile = "tests/img.jpg";
  const { size } = await fs.promises.stat(pathToFile);
  const price = await bundlr.getPrice(size);
  const priceConverted = bundlr.utils.fromAtomic(price);
  console.log(`Cost of this ${size} upload is ${priceConverted}`);

  // 5. Fund the wallet with the necessary amount.
  const fundTx = await bundlr.fund(price);
  console.log(`Funding successful, amount funded is ${fundTx.quantity}`);

  // 3. Check and display the current balance of the wallet.
  const balance = await bundlr.getLoadedBalance();
  const decimalBalance = bundlr.utils.fromAtomic(balance);
  console.log(`account funded with decimal balance ${decimalBalance}`);

  // 6. Upload the file and display the resulting URL.
  const uploadTx = await bundlr.uploadFile(pathToFile);
  console.log(`File uploaded to URL= https://areweave.net/${uploadTx.id}`);

  // 7. Show balance again
  console.log(`account funded with decimal balance ${decimalBalance}`);
}

main();
