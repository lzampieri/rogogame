#ifndef GAMEPROPS_H
#define GAMEPROPS_H

using arrow = unsigned char;

enum GamePlayer : signed char {
    Red = 1,
    Blu = -1
};

enum GameEsit : signed char {
    RedWin = GamePlayer::Red,
    Tie = 0,
    BluWin = GamePlayer::Blu
};

enum PlayerType : signed char {
    Smart,
    Random
};

class GameProbEsit {
public:
    GameProbEsit( double probWinRed, double probWinBlu ) : probWinRed( probWinRed ), probWinBlu( probWinBlu ) {}
    GameProbEsit( const GameEsit esit ) {
        probWinRed = 0;
        probWinBlu = 0;
        if( esit == GameEsit::RedWin ) probWinRed = 1;
        if( esit == GameEsit::BluWin ) probWinBlu = 1;
    }

private:
    double probWinRed;
    double probWinBlu;

public:
    inline double probTie() const { return 1 - probWinRed - probWinBlu; }
    inline double probWin( const GamePlayer gp ) const { return ( gp == GamePlayer::Red ? probWinRed : probWinBlu ); }

    GameProbEsit& operator+=( const GameProbEsit a ) { probWinRed += a.probWinRed; probWinBlu += a.probWinBlu; return *this; };
    friend GameProbEsit operator+( const GameProbEsit& a, const GameProbEsit& b ) { return GameProbEsit( a.probWinRed + b.probWinRed, a.probWinBlu + b.probWinBlu ); };
    GameProbEsit& operator/=( double d ) { probWinRed /= d; probWinBlu /= d; return *this; };
    friend GameProbEsit operator/( const GameProbEsit& a, const double d ) { return GameProbEsit( a.probWinRed / d, a.probWinBlu / d ); };
};

#endif