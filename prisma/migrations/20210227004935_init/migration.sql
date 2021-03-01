-- CreateTable
CREATE TABLE "ExchangeSymbol" (
    "fullSymbolName" VARCHAR(51) NOT NULL,
    "baseCurrency" VARCHAR(8) NOT NULL,
    "quoteCurrency" VARCHAR(8) NOT NULL,
    "symbolName" VARCHAR(16) NOT NULL,
    "exchangeName" VARCHAR(25) NOT NULL,

    PRIMARY KEY ("fullSymbolName")
);

-- CreateTable
CREATE TABLE "KlineData" (
    "id" SERIAL NOT NULL,
    "fullSymbolName" VARCHAR(51) NOT NULL,
    "exchangeName" VARCHAR(25) NOT NULL,
    "openPrice" VARCHAR(32) NOT NULL,
    "openTime" VARCHAR(32) NOT NULL,
    "closePrice" VARCHAR(32) NOT NULL,
    "closeTime" VARCHAR(32) NOT NULL,
    "highPrice" VARCHAR(32) NOT NULL,
    "lowPrice" VARCHAR(32) NOT NULL,
    "volume" VARCHAR(32) NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Exchange" (
    "name" VARCHAR(25) NOT NULL,
    "endPoint" VARCHAR(255) NOT NULL,

    PRIMARY KEY ("name")
);

-- CreateTable
CREATE TABLE "ApiKey" (
    "id" SERIAL NOT NULL,
    "apiKey" TEXT NOT NULL,
    "secret" TEXT NOT NULL,
    "userID" INTEGER NOT NULL,
    "exchangeName" VARCHAR(25) NOT NULL,
    "subaccount" VARCHAR(25),

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR(50) NOT NULL,
    "firstName" VARCHAR(15),
    "lastName" VARCHAR(15),

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Exchange.endPoint_unique" ON "Exchange"("endPoint");

-- CreateIndex
CREATE UNIQUE INDEX "User.email_unique" ON "User"("email");

-- AddForeignKey
ALTER TABLE "ExchangeSymbol" ADD FOREIGN KEY ("exchangeName") REFERENCES "Exchange"("name") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KlineData" ADD FOREIGN KEY ("fullSymbolName") REFERENCES "ExchangeSymbol"("fullSymbolName") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KlineData" ADD FOREIGN KEY ("exchangeName") REFERENCES "Exchange"("name") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApiKey" ADD FOREIGN KEY ("userID") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApiKey" ADD FOREIGN KEY ("exchangeName") REFERENCES "Exchange"("name") ON DELETE CASCADE ON UPDATE CASCADE;
