import Information from "../../models/information.js";
import * as fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { TextLoader } from 'langchain/document_loaders/fs/text';
import { CharacterTextSplitter } from 'langchain/text_splitter';
import { FaissStore } from 'langchain/vectorstores/faiss'
import { OpenAIEmbeddings } from "langchain/embeddings/openai";


const __filename = fileURLToPath(import.meta.url);
const aFilePath = __filename;
const bDirectoryPath = '../../faiss_index_react';
const absoluteBPath = path.resolve(path.dirname(aFilePath), bDirectoryPath);

const pluck = (arr, key) => arr.map(i => i[key]);


const postAddInformation = async (req, res, next) => {
    const content = req.body.content;
    const questionId = req.body.questionId;
    fs.writeFile('output.txt', content, (err) => {
        if (err) {
            console.error('Error writing to file:', err);
        } else {
            console.log("Array saved to output.txt");
        }
    });
    await Information.create({
        content: content,
        unsolveQuestionId: questionId
    }).then(result => {
        console.log('success')
    }).catch(err => console.log(err));




    if (fs.existsSync(absoluteBPath)) {
        const loader = new TextLoader('output.txt');
        const documents = await loader.load();
        const directory = 'D:/Github/chatgpt/server/faiss_index_react';
        const text_splitter = new CharacterTextSplitter({
            chunkSize: 1000, chunkOverlap: 30, separator: '\n'
        });
        const docs = await text_splitter.splitDocuments(documents);
        const embeddings = new OpenAIEmbeddings({
            openAIApiKey: "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", // In Node.js defaults to process.env.OPENAI_API_KEY
        });

        const vectorstore = await FaissStore.fromDocuments(docs, embeddings);

        const old_vectorstore = await FaissStore.load(directory, embeddings);

        vectorstore.mergeFrom(old_vectorstore);

        try {
            await vectorstore.save(directory);
            console.log('faiss merge!');
            return res.json({
                status: 'success'
            });
        }
        catch (err) {
            console.log(err);
        }
    } else {

        await Information.findAll()
            .then(result => {
                const arr = pluck(result, 'content');
                const content = arr.join('\n');
                fs.writeFile('output.txt', content, (err) => {
                    if (err) {
                        console.error('Error writing to file:', err);
                    } else {
                        console.log("Array saved to output.txt");
                    }
                })
            }).catch(err => console.log(err));
        const loader = new TextLoader('output.txt');
        const documents = await loader.load();
        const directory = 'D:/Github/chatgpt/server/faiss_index_react';
        const text_splitter = new CharacterTextSplitter({
            chunkSize: 1000, chunkOverlap: 30, separator: '\n'
        });
        const docs = await text_splitter.splitDocuments(documents);
        const embeddings = new OpenAIEmbeddings({
            openAIApiKey: "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", // In Node.js defaults to process.env.OPENAI_API_KEY
        });
        const vectorstore = await FaissStore.fromDocuments(docs, embeddings);
        await vectorstore.save(directory);

        return res.json({
            status: 'success'
        });
    }


};


export { postAddInformation };