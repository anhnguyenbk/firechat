class ScrollUtils {
    static initScroll(element) {
        element.mCustomScrollbar({
            axis: "y" // init scrollbar
        });
    }

    static endReached(element) {
        // return element.scrollTop() + element.innerHeight() >= element[0].scrollHeight;
        const dragger = element.find(".mCSB_dragger");
        const scrollPos = dragger.position().top + dragger.height();
        return element.height() - scrollPos < 20;
    }

    static scrollToEnd(element) {
        // element.scrollTop(element[0].scrollHeight);
        element.mCustomScrollbar("scrollTo", "bottom", {scrollInertia: 0})
    }

    static hasScrollBar(element) {
        var scrollHeight = element.find('.mCSB_container').height();
        return scrollHeight > element.height();
    }
}

export default ScrollUtils;