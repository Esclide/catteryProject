const DEFAULT_CHAR_SET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

export class StringGenerator {
    /**
     * Generates a random string of the specified length
     * @param {number} length
     * @param {string} [charSet]
     * @return {string}
     */
    public getRandomString(length: number, charSet = DEFAULT_CHAR_SET): string {

        let random = '';

        for (let i = 0; i < length; i++) {
            random += charSet.charAt(Math.floor(Math.random() * charSet.length));
        }

        return random;
    }
}
