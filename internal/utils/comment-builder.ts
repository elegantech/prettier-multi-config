export interface ICommentOptions {
  type: 'block' | 'inline-block' | 'inline';

  /**
   * Start symbol for block comments.
   *
   * @default '*'
   */
  startSymbol?: '*' | '!' | '';
}

export interface ICommentStringOptions {
  /**
   * Text added at the beginning of the string.
   */
  prefix: string;

  /**
   * Text added at the end of the string.
   */
  suffix: string;

  /**
   * Starts with a new line character before suffix and string.
   */
  newLine: boolean;

  /**
   * TODO: Implement
   */
  printWidth: number | null;

  /**
   * TODO: Implement
   */
  wrap: boolean | null;
}

/**
 *
 */
export class CommentString {
  public readonly options: ICommentStringOptions;

  public constructor(
    public readonly text: string,
    options: Partial<ICommentStringOptions> = {}
  ) {
    this.options = {
      prefix: '',
      suffix: '',
      newLine: false,
      printWidth: null,
      wrap: null,
      ...options,
    };
  }

  public get(): string {
    const prefix = (this.options.newLine ? '\n' : '') + this.options.prefix;

    return `${prefix}${this.text}${this.options.suffix}`;
  }

  public toString(): string {
    return this.get();
  }
}

/**
 * Represents a raw new line, without comment prefix ('// ' or ' *')
 */
export const EMPTY_RAW_NEW_LINE: Readonly<CommentString> = new CommentString('', { newLine: true });

export const EMPTY_NEW_LINE: Readonly<string> = '';

export const BLANK_SPACE = ' ';

/**
 *
 */
export class CommentBuilder {
  protected readonly START_COMMENT = {
    block: '/*',
    inline: '',
    'inline-block': '/*',
  } as const;

  protected readonly END_COMMENT = {
    block: '\n */',
    inline: '',
    'inline-block': ' */',
  } as const;

  protected readonly NEW_COMMENT_LINE: { [key in ICommentOptions['type']]: Partial<ICommentStringOptions> } = {
    block: {
      prefix: `${BLANK_SPACE}*${BLANK_SPACE}`,
      suffix: '',
      newLine: true,
    },
    inline: {
      prefix: '//' + BLANK_SPACE,
      newLine: true,
    },
    'inline-block': {
      prefix: BLANK_SPACE,
      newLine: true,
    },
  } as const;

  public readonly lines: (string | CommentString)[] = [];

  constructor(protected readonly options: ICommentOptions = { type: 'block', startSymbol: '*' }) {}

  /**
   * Adds new line to the comment.
   *
   * @param text Text to add to the comment.
   */
  public add(text: string | CommentString): this {
    this.lines.push(text);

    return this;
  }

  /**
   * Adds multiple lines to the comment block.
   *
   * @param lines List of lines to add to the comment block.
   */
  public addLines(...lines: (string | CommentString)[]): this {
    for (const line of lines) {
      this.add(line);
    }

    return this;
  }

  protected startComment(): string {
    return this.START_COMMENT[this.options.type] + (this.options.startSymbol ?? '');
  }

  protected getContent(): string {
    const commentLines: CommentString[] = [];

    for (const line of this.lines) {
      if (line instanceof CommentString) {
        commentLines.push(line);
      } else {
        commentLines.push(new CommentString(line, this.NEW_COMMENT_LINE[this.options.type]));
      }
    }

    return commentLines.map((line) => line.get()).join('');
  }

  protected endComment(): string {
    return `${this.END_COMMENT[this.options.type]}`;
  }

  public build(): string {
    // console.log(this.startComment() + 'Hola', this.NEW_COMMENT_LINE[this.options.type], this.options.type);
    // TODO: Add indentation level
    return this.startComment() + this.getContent() + this.endComment();
  }

  public toString(): string {
    return this.build();
  }
}
