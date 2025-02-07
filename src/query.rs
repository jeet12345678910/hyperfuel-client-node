use anyhow::{Context, Result};
use napi::bindgen_prelude::BigInt;

use serde::{Deserialize, Deserializer, Serialize, Serializer};

// Custom serializer function for BigInt<Utc>
fn serialize_bigint<S>(bigint: &Option<Vec<BigInt>>, serializer: S) -> Result<S::Ok, S::Error>
where
    S: Serializer,
{
    match bigint {
        Some(vec) => {
            let vec_u64: Vec<u64> = vec
                .iter()
                .map(|bigint: &BigInt| bigint.get_u64().1)
                .collect();
            serializer.serialize_some(&vec_u64)
        }
        None => serializer.serialize_none(),
    }
}
fn deserialize_bigint<'de, D>(deserializer: D) -> Result<Option<Vec<BigInt>>, D::Error>
where
    D: Deserializer<'de>,
{
    let option_vec_of_u64: Option<Vec<u64>> = Option::deserialize(deserializer)?;
    match option_vec_of_u64 {
        Some(vec_of_u64) => {
            let vec_of_bigint: Vec<BigInt> = vec_of_u64
                .into_iter()
                .map(|u64_val: u64| {
                    u64_val.into()
                    // u64_val.to_napi_value()
                })
                .collect();
            Ok(Some(vec_of_bigint))
        }
        None => Ok(None),
    }
}

// TODO: is Deserialize required?
#[napi(object)]
#[derive(Default, Serialize, Deserialize, Clone, Debug)]
pub struct ReceiptSelection {
    #[serde(skip_serializing_if = "Option::is_none")]
    pub root_contract_id: Option<Vec<String>>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub to_address: Option<Vec<String>>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub asset_id: Option<Vec<String>>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub receipt_type: Option<Vec<u8>>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub sender: Option<Vec<String>>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub recipient: Option<Vec<String>>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub contract_id: Option<Vec<String>>,
    #[serde(skip_serializing_if = "Option::is_none")]
    #[serde(deserialize_with = "deserialize_bigint")]
    #[serde(serialize_with = "serialize_bigint")]
    pub ra: Option<Vec<BigInt>>,
    #[serde(skip_serializing_if = "Option::is_none")]
    #[serde(deserialize_with = "deserialize_bigint")]
    #[serde(serialize_with = "serialize_bigint")]
    pub rb: Option<Vec<BigInt>>,
    #[serde(skip_serializing_if = "Option::is_none")]
    #[serde(deserialize_with = "deserialize_bigint")]
    #[serde(serialize_with = "serialize_bigint")]
    pub rc: Option<Vec<BigInt>>,
    #[serde(skip_serializing_if = "Option::is_none")]
    #[serde(deserialize_with = "deserialize_bigint")]
    #[serde(serialize_with = "serialize_bigint")]
    pub rd: Option<Vec<BigInt>>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub tx_status: Option<Vec<u8>>,
}

#[napi(object)]
#[derive(Default, Serialize, Deserialize, Clone, Debug)]
pub struct InputSelection {
    #[serde(skip_serializing_if = "Option::is_none")]
    pub owner: Option<Vec<String>>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub asset_id: Option<Vec<String>>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub contract: Option<Vec<String>>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub sender: Option<Vec<String>>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub recipient: Option<Vec<String>>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub input_type: Option<Vec<u8>>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub tx_status: Option<Vec<u8>>,
}

#[napi(object)]
#[derive(Default, Serialize, Deserialize, Clone, Debug)]
pub struct OutputSelection {
    #[serde(skip_serializing_if = "Option::is_none")]
    pub to: Option<Vec<String>>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub asset_id: Option<Vec<String>>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub contract: Option<Vec<String>>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub output_type: Option<Vec<u8>>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub tx_status: Option<Vec<u8>>,
}

#[napi(object)]
#[derive(Default, Debug, Clone, Serialize, Deserialize)]
pub struct FieldSelection {
    #[serde(skip_serializing_if = "Option::is_none")]
    pub block: Option<Vec<String>>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub transaction: Option<Vec<String>>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub receipt: Option<Vec<String>>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub input: Option<Vec<String>>,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub output: Option<Vec<String>>,
}

#[napi(object)]
#[derive(Default, Serialize, Deserialize, Clone, Debug)]
pub struct Query {
    /// The block to start the query from
    pub from_block: i64,
    /// The block to end the query at. If not specified, the query will go until the
    ///  end of data. Exclusive, the returned range will be [from_block..to_block).
    ///
    /// The query will return before it reaches this target block if it hits the time limit
    ///  configured on the server. The user should continue their query by putting the
    ///  next_block field in the response into from_block field of their next query. This implements
    ///  pagination.
    #[serde(skip_serializing_if = "Option::is_none")]
    pub to_block: Option<i64>,
    /// List of receipt selections, the query will return receipts that match any of these selections and
    ///  it will return receipts that are related to the returned objects.
    #[serde(skip_serializing_if = "Option::is_none")]
    pub receipts: Option<Vec<ReceiptSelection>>,
    /// List of input selections, the query will return inputs that match any of these selections and
    ///  it will return inputs that are related to the returned objects.
    #[serde(skip_serializing_if = "Option::is_none")]
    pub inputs: Option<Vec<InputSelection>>,
    /// List of output selections, the query will return outputs that match any of these selections and
    ///  it will return outputs that are related to the returned objects.
    #[serde(skip_serializing_if = "Option::is_none")]
    pub outputs: Option<Vec<OutputSelection>>,
    /// Whether to include all blocks regardless of if they are related to a returned transaction or log. Normally
    ///  the server will return only the blocks that are related to the transaction or logs in the response. But if this
    ///  is set to true, the server will return data for all blocks in the requested range [from_block, to_block).
    #[serde(skip_serializing_if = "Option::is_none")]
    pub include_all_blocks: Option<bool>,
    /// Field selection. The user can select which fields they are interested in, requesting less fields will improve
    ///  query execution time and reduce the payload size so the user should always use a minimal number of fields.
    pub field_selection: FieldSelection,
    /// Maximum number of blocks that should be returned, the server might return more blocks than this number but
    ///  it won't overshoot by too much.
    #[serde(skip_serializing_if = "Option::is_none")]
    pub max_num_blocks: Option<i64>,
    /// Maximum number of transactions that should be returned, the server might return more transactions than this number but
    ///  it won't overshoot by too much.
    #[serde(skip_serializing_if = "Option::is_none")]
    pub max_num_transactions: Option<i64>,
}

impl Query {
    pub fn try_convert(&self) -> Result<hyperfuel_net_types::Query> {
        let json = serde_json::to_vec(self).context("serialize to json")?;
        serde_json::from_slice(&json).context("parse json")
    }
}

impl TryFrom<hyperfuel_net_types::Query> for Query {
    type Error = anyhow::Error;

    fn try_from(hyperfuel_query: hyperfuel_net_types::Query) -> Result<Self> {
        let json = serde_json::to_vec(&hyperfuel_query).context("serialize query to json")?;
        serde_json::from_slice(&json).context("parse json")
    }
}
