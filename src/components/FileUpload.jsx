import { useState } from "react";
import Bundlr from "@bundlr-network/client/build/cjs/common/bundlr";
function FileUpload() {
  const [file, setFile] = useState(null);

  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      console.error("No file is selected");
      return;
    }

    const bundlr = new Bundlr(
      "https://devnet.bundlr.network",
      "matic",
      process.env.PRIVATE_KEY,
      {
        providerUrl:
          "https://polygon-mumbai.g.alchemy.com/v2/kmFSLZCO-IFXkMQbFSMWiFG8ivC8Hw5N",
      }
    );

    const pathToFile = "file";
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
    console.log(
      `File uploaded to URL= https://devnet.bundlr.network/tx/${uploadTx.id}/data`
    );
  };
  return (
    <div>
      <input type="file" onChange={handleChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}

export default FileUpload;
