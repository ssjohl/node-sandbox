const bizSdk = require('facebook-nodejs-business-sdk');

const accessToken = 'EAAPQhzilR2MBADiM0YbTlZBuZCooTQUrZCTIk2tDalnZC61GVsr1X0ZCC1JsM40xliIQBXBJa97y3P6uMqjcpPJQhVkkPssOXWrGxiVZCwxnpmurWe6zNP0oe1slh4H9PFDcTQXtn1Onr2EfQ47E1ZBeQtBZBoUGp84QyoZAPjZCT6pyGTvUK29LrO';
const accountId = 'act_649764792123095'; // Burbank VIC - Local
// const accountId = 'act_595627197697435'; // Johl Test

const FacebookAdsApi = bizSdk.FacebookAdsApi.init(accessToken);
const AdAccount = bizSdk.AdAccount;
const Campaign = bizSdk.Campaign;
const OfflineConversionDataSet = bizSdk.OfflineConversionDataSet;

// Connect account
const account = new AdAccount(accountId);

// List OfflineConversionDataSets
account.read([AdAccount.Fields.name])
  .then((account) =>{
    return account.getCampaigns([OfflineConversionDataSet.Fields.name], { limit: 10 })
  })
  .then((results) =>{
    results.forEach((entity) =>console.log(entity.name));
  })
  .then(() =>{
    console.log("All Done");
  })
  .catch(console.error);

// // List accounts
// account.read([AdAccount.Fields.name])
// .then((account) =>{
//   return account.getCampaigns([Campaign.Fields.name], { limit: 10 }) // fields array and params
// })
// .then((campaigns) =>{
//   campaigns.forEach((campaign) =>console.log(campaign.name));
// })
// .then(() =>{
//   console.log("All Done");
// })
// .catch(console.error);
