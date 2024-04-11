import {
    Connection,
    Keypair,
    TransactionInstruction,
    Transaction,
    clusterApiUrl,
    sendAndConfirmTransaction
} from "@solana/web3.js";
import { readFileSync } from "fs";
import { describe } from "mocha";
import { homedir } from "os";

function createKeypairFromFile(path: string): Keypair {
    return Keypair.fromSecretKey(
        Buffer.from(JSON.parse(readFileSync(path, "utf-8")))
    );
}

describe("hello-solana", () => {
    const connection = new Connection(clusterApiUrl("devnet"), "confirmed");
    const payer = createKeypairFromFile(homedir() + '/.config/solana/id.json');
    const program = createKeypairFromFile('./program/target/so/program-keypair.json');

    it("say hello!", async () => {
        let ix = new TransactionInstruction({
            keys: [
                {pubkey: payer.publicKey, isSigner: true, isWritable: true},
            ],
            programId: program.publicKey,
            data: Buffer.alloc(0),
        });
        
        await sendAndConfirmTransaction(
            connection, 
            new Transaction().add(ix), 
            [payer],
        );
    });
});