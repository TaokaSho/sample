import './App.css';
import React, { useState, useEffect } from 'react';

function App() {
  const [isMenuVisible, setIsMenuVisible] = useState(true); // 初期状態でメニューを表示
  const [isHeaderHovered, setIsHeaderHovered] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true); // ページトップにいるかどうか

  // スクロール時にメニューの表示状態を制御
  useEffect(() => {
    const handleScroll = () => {
      const atTop = window.scrollY === 0;
      setIsAtTop(atTop);

      if (!isHeaderHovered && !atTop) {
        setIsMenuVisible(false);
      } else if (atTop) {
        setIsMenuVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isHeaderHovered]);

  const handleMouseEnter = () => {
    setIsHeaderHovered(true);
    setIsMenuVisible(true); // ヘッダーにカーソルを当てたらメニューを表示
  };

  const handleMouseLeave = () => {
    setIsHeaderHovered(false);
    if (!isAtTop) {
      setIsMenuVisible(false); // ページトップでない場合のみ非表示
    }
  };

  return (
    <div className="container" style={{ display: 'flex', flexDirection: 'column' }}>
      {/* ヘッダー */}
      <header
        className="header"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{ position: 'sticky', top: 0, zIndex: 1000 }}
      >
        <div className="logo">Knowledge</div>
        <input className="search-box" type="text" placeholder="検索..." />
        <button className="post-button">投稿する</button>
        {isMenuVisible && (
          <nav className="nav-menu" style={{ position: 'absolute', top: '100%', background: '#fff' }}>
            <a href="#">ホーム</a>
            <a href="#">プロフィール</a>
            <a href="#">投稿編集</a>
          </nav>
        )}
      </header>

      {/* メインエリア */}
      <main className="main responsive-layout" style={{ display: 'flex', flexDirection: 'row' }}>
        {/* 投稿一覧 */}
        <section className="post-list" style={{ flex: 3 }}>
          {Array.from({ length: 10 }).map((_, index) => (
            <div className="post" key={index}>
              <img className="profile-img" src="sanple-profile.png" alt="プロフィール" />
              <div className="post-content">
                <div className="post-meta">
                  <span className="post-date">2025年5月17日</span>
                </div>
                <h2 className="post-title">ReactとSpringによるログイン機能 {index + 1}</h2>
                <div className="post-tags">
                  <span className="tag">#React</span>
                  <span className="tag">#Spring</span>
                </div>
                <div className="post-stats">
                  ❤️ 12 ・ 💬 5 コメント
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* タグ一覧 */}
        <aside className="tag-sidebar" style={{ flex: 1 }}>
          <h3>プログラミング言語タグ一覧</h3>
          <ul>
            <li>#JavaScript</li>
            <li>#Python</li>
            <li>#Java</li>
            <li>#C++</li>
          </ul>
          <h3>タグ一覧</h3>
          <ul>
            <li>#React</li>
            <li>#Java</li>
            <li>#データベース</li>
            <li>#UIデザイン</li>
          </ul>
        </aside>
      </main>
    </div>
  );
}

export default App;
