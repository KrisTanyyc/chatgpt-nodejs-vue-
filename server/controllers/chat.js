import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { FaissStore } from 'langchain/vectorstores/faiss'
import { RetrievalQAChain } from "langchain/chains";
import { ChatOpenAI } from "langchain/chat_models/openai";

const versionOne = async (req, res) => {
    const prompt = [{
        'role': 'system',
        'content': `
        You are a tax expert.
        If question is not related to tax, pls dont answer and apologize to user.
        So, you need to greet to user first.
        The users are Malaysian, so you need to answer the question based on the situation in Malaysia.
        You need to answer the question with 'yes' or 'no' first,
        after that give your explanation in no more than 100 words.
        `
    }];
    const { messages } = req.body;

    const context = prompt.concat(messages);

    res.json({
        response: context,
    });
};


const versionTwo = async (req, res) => {
    
    // const loader = new TextLoader('output.txt')
    const { messages } = req.body;
    // const documents = await loader.load()
    const directory = 'D:/Github/chatgpt/server/faiss_index_react'
    // const text_splitter = new CharacterTextSplitter({
    //     chunkSize: 1000, chunkOverlap: 30, separator: '\n'
    // })
    // const docs = await text_splitter.splitDocuments(documents)
    const embeddings = new OpenAIEmbeddings({
        openAIApiKey: "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", // In Node.js defaults to process.env.OPENAI_API_KEY
    });
    // const vectorstore = await FaissStore.fromDocuments(docs, embeddings)
    // await vectorstore.save(directory)

    const new_vectorstore = await FaissStore.load(directory, embeddings)

    const model = new ChatOpenAI({
        openAIApiKey: "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", // In Node.js defaults to process.env.OPENAI_API_KEY
    });

    const vectorStoreRetriver = new_vectorstore.asRetriever()

    const chain = RetrievalQAChain.fromLLM(model, vectorStoreRetriver)

    const re = await chain.call({
        query: messages,
    });

    res.json({
        response: re.text,
    });
};

export { versionOne, versionTwo };