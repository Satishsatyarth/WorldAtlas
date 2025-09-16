import axios from "axios";

const api = axios.create({
  baseURL: "https://restcountries.com/v3.1",
  timeout: 15000, // 15s timeout to avoid hanging forever
});

// HTTP GET METHOD
export const getCountryData = async () => {
  try {
    const response = await api.get(
      "/all?fields=name,population,region,capital,flags"
    );
    return response.data;
  } catch (error) {
    handleAxiosError(error, "fetching all countries");
    throw error; // rethrow so UI can handle
  }
};

// HTTP GET METHOD for the individual country name
export const getCountryIndData = async (name) => {
  try {
    const response = await api.get(
      `/name/${encodeURIComponent(
        name
      )}?fullText=true&fields=name,population,region,subregion,capital,tld,currencies,languages,borders,flags`
    );
    return response.data;
  } catch (error) {
    handleAxiosError(error, `fetching country ${name}`);
    throw error;
  }
};

// Utility function to handle Axios errors gracefully
function handleAxiosError(error, action) {
  if (axios.isAxiosError(error)) {
    if (error.code === "ECONNABORTED") {
      console.error(`⏱ Timeout while ${action}:`, error.message);
    } else if (error.response) {
      console.error(
        `❌ Error ${action}: ${error.response.status} - ${error.response.data}`
      );
    } else if (error.request) {
      console.error(`🌐 No response received while ${action}:`, error.request);
    } else {
      console.error(`⚠️ Unexpected error ${action}:`, error.message);
    }
  } else {
    console.error(`Unknown error ${action}:`, error);
  }
}
