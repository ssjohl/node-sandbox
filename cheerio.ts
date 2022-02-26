import axios from "axios";
import cheerio from "cheerio";
import Debug from "debug";
const debug = Debug("Parser");

type CheerioSelector = any;
type CheerioResponses = Array<object>;
type CheerioResponse = object | null;

const getData = async (url: string) => {
	debug(`Fetching: ${url}`);
	const { data } = await axios.get(url);
	return data;
};

const getLinks = async (
	data: string,
	elPattern: CheerioSelector
): Promise<CheerioResponses> => {
	try {
		const $ = cheerio.load(data);
		const output: Array<object> = [];

		$(elPattern).each((_idx, el) => {
			output.push({
				title: $(el).text().replace(/\n/gi, "").trim(),
				href: $(el).attr("href"),
			});
		});

		return output;
	} catch (error) {
		throw error;
	}
};

const getObjects = async (
	data: string,
	elPattern: CheerioSelector
): Promise<CheerioResponses> => {
	try {
		const $ = cheerio.load(data);
		const output: Array<object> = [];

		$(elPattern).each((_idx, el) => {
			output.push($(el));
		});

		return output;
	} catch (error) {
		throw error;
	}
};

const getObject = async (
	data: string,
	elPattern: CheerioSelector
): Promise<CheerioResponse> => {
	try {
		const $ = cheerio.load(data);
		const outputs: Array<CheerioResponse> = [];

		$(elPattern).each((_idx, el) => {
			outputs.push($(el));
		});

		if (outputs.length == 1) {
			return outputs[0];
		}
		return null;
	} catch (error) {
		throw error;
	}
};
